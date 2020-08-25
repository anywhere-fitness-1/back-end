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
        res.status(404).json({ message: "ain't got no client by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "I declare bankruptcy" });
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
        res.status(404).json({ message: "no such client" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update client" });
    });
});
router.delete("/:id", (req, res) => {
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
      res.status(500).json({ message: "Couldn't fire Creed" });
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

router.get("/:id/classes/add-client-class/:classId", restricted, (req, res) => {
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
        res.status(404).json({ message: "Not classy" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Don't be an idiot" });
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
