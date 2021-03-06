const router = require("express").Router();

const clients = require("../clients/client-model.js");
const restricted = require("../../auth/restricted-middleware.js");
const classes = require("../classes/class-model.js");
const clientClasses = require("../classes/class-model.js");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../data/secrets.js");
const { isValid } = require("../../auth/auth-user.js");

// add "restricted" parameter to routes where needed
// router.get("/", restricted, (req, res) => {

// adding/editing/validating clients
router.get("/", restricted, (req, res) => {
  clients
    .find()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  clients
    .findById(id)
    .then((client) => {
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ message: "No client by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting that client" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  clients
    .findById(id)
    .then((client) => {
      if (client) {
        clients.update(changes, id).then((updatedClient) => {
          res.json(updatedClient);
        });
      } else {
        res.status(404).json({ message: "No client by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating the client" });
    });
});
router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;
  clients
    .remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find that client" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting the client" });
    });
});

router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    clients
      .add(credentials)
      .then((client) => {
        res.status(201).json(client);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    console.log(error);
    res.status(400).json({
      message: "please provide username and password",
    });
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    clients
      .findBy({ username: username })
      .then(([client]) => {
        if (client && bcryptjs.compareSync(password, client.password)) {
          const token = generateToken(client);
          res.status(200).json({
            message: `Welcome to Thunderdome, ${client.username}`,
            id: `${client.id}`,
            username: `${client.username}`,
            name: `${client.name}`,
            about: `${client.about}`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password",
    });
  }
});
// getting/adding classes to client profile

router.get("/:id/classes/add-client-class/:classId", (req, res) => {
  const { id } = req.params;
  const { classId } = req.params;

  clients
    .findById(id)
    .then((client) => {
      if (client) {
        clientClasses.addClientToClass(id, classId).then((newClass) => {
          res.status(201).json(newClass);
        });
      } else {
        res.status(404).json({ message: "couldn't find that client" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed to add class" });
    });
});

router.get("/:id/classes", restricted, (req, res) => {
  const { id } = req.params;
  classes
    .findClientClasses(id)
    .then((classData) => {
      if (classData) {
        res.json(classData);
      } else {
        res
          .status(404)
          .json({ message: "No class for that client based on the id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting the client's classes" });
    });
});

// Endpoint below is not being used. That function starts the endpoint at the class id and then move outward to clientId

// router.get(
//   "/:id/classes/:classId/add-client-class/",
//   restricted,
//   (req, res) => {
//     const { id } = req.params;
//     const { classId } = req.params;

//     classes
//       .findById(classId)
//       .then((classData) => {
//         if (classData) {
//           clientClasses.addClientToClass(id, classId).then((addedClass) => {
//             res.status(201).json({ addedClass, classId });
//           });
//         } else {
//           res.status(404).json({ message: "couldn't find that class" });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ message: "failed to add class" });
//       });
//   }
// );

// This endpoint isn't working. I'd like it to be able to return all the classes but be buried in the client router
router.get("/classes", restricted, (req, res) => {
  classes
    .findClasses()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/classes/:id", restricted, (req, res) => {
  const { id } = req.params;
  classes
    .findById(id)
    .then((client) => {
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ message: "No client by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting that client" });
    });
});

function generateToken(client) {
  const payload = {
    subject: client.id,
    username: client.username,
  };
  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}
module.exports = router;
