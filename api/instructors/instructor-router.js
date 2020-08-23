const router = require("express").Router();

const instructors = require("../instructors/instructor-model.js");
const restricted = require("../../auth/restricted-middleware.js");
const classes = require("../classes/class-model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../data/secrets.js");
const { isValid } = require("../../auth/auth-user.js");
// add "restricted" parameter to routes where needed
const authenticate = require("../../auth/restricted-middleware.js");
// router.get("/", restricted, (req, res) => {

// instructor adding
router.get("/", (req, res) => {
  instructors
    .find()
    .then((instructors) => {
      res.status(200).json(instructors);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  instructors
    .findById(id)
    .then((instructor) => {
      if (instructor) {
        res.json(instructor);
      } else {
        res.status(404).json({ message: "ain't got no instructor by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "I declare bankruptcy" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  instructors
    .findById(id)
    .then((instructor) => {
      if (instructor) {
        instructors.update(changes, id).then((updatedInstructor) => {
          res.json(updatedInstructor);
        });
      } else {
        res.status(404).json({ message: "no such instructor" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update instructor" });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  instructors
    .remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find that instructor" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Couldn't fire Ryan" });
    });
});
router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    instructors
      .add(credentials)
      .then((instructor) => {
        res.status(201).json(instructor);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    console.log(error);
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    instructors
      .findBy({ username: username })
      .then(([instructor]) => {
        if (instructor && bcryptjs.compareSync(password, instructor.password)) {
          const token = generateToken(instructor);
          res.status(200).json({
            message: `Welcome to Thunderdome, ${instructor.username}`,
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
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

// class editing by an instructor
// add authenticate below
router.post("/create-class", (req, res) => {
  const classData = req.body;
  instructors
    .addInstClass(classData)
    .then((addedClass) => {
      res.status(201).json(addedClass);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});
router.get("/:id/classes", (req, res) => {
  const { id } = req.params;
  classes
    .findById(id)
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
router.put("/classes/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  classes
    .findById(id)
    .then((classData) => {
      if (classData) {
        classes.update(changes, id).then((updatedClass) => {
          res.json(updatedClass);
        });
      } else {
        res.status(404).json({ message: "no such class" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update class" });
    });
});

function generateToken(instructor) {
  const payload = {
    subject: instructor.id,
    username: instructor.username,
  };
  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
