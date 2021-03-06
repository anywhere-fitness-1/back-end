const router = require("express").Router();

const instructors = require("../instructors/instructor-model.js");
const restricted = require("../../auth/restricted-middleware.js");
const classes = require("../classes/class-model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../data/secrets.js");
const { isValid } = require("../../auth/auth-user.js");

// add "restricted" parameter to routes where needed

// router.get("/", restricted, (req, res) => {

// instructor adding
router.get("/", restricted, (req, res) => {
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
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  instructors
    .findById(id)
    .then((instructor) => {
      if (instructor) {
        res.json(instructor);
      } else {
        res.status(404).json({ message: "No such instructor" });
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

  instructors
    .findById(id)
    .then((instructor) => {
      if (instructor) {
        instructors.update(changes, id).then((updatedInstructor) => {
          res.json(updatedInstructor);
        });
      } else {
        res.status(404).json({ message: "No such instructor" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update instructor" });
    });
});
router.delete("/:id", restricted, (req, res) => {
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
      res.status(500).json({ message: "Error deleting the instructor" });
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
      message: "please provide username and password",
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
            message: `Welcome to Thunderdome, ${instructor.name}`,
            id: `${instructor.id}`,
            username: `${instructor.username}`,
            name: `${instructor.name}`,
            specialties: `${instructor.specialties}`,
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

// class editing by an instructor
// add restricted below
router.post("/create-class", restricted, (req, res) => {
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
        res.status(404).json({ message: "Could not find that class" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting that class" });
    });
});
router.put("/classes/:id", restricted, (req, res) => {
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
        res.status(404).json({ message: "Could not find that class" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating that class" });
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
