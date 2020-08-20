const router = require("express").Router();

const classes = require("../classes/class-model.js");

router.get("/", (req, res) => {
  classes
    .find()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/:id", (req, res) => {
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

module.exports = router;
