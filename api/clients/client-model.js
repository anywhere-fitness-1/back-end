const db = require("../../data/dbConfig.js");
const classes = require("../classes/class-model.js");

module.exports = {
  add,
  find,
  findById,
  findBy,
  update,
  remove,
  findClasses,
};

function find() {
  return db("clients")
    .select("id", "username", "password", "name", "about")
    .orderBy("id");
}

function findById(id) {
  return db("clients").where({ id });
}

function findBy(filter) {
  return db("clients")
    .select("id", "username", "password", "name", "about")
    .where(filter);
}

function add(client) {
  return db("clients")
    .insert(client, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
  return db("clients")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  return db("clients").where({ id }).del();
}

function findClasses() {
  return db("classes")
    .select(
      "id",
      "name",
      "type",
      "time",
      "date",
      "duration",
      "intensity",
      "location",
      "attendees",
      "maxClassSize",
      "instructor_id"
    )
    .orderBy("id");
}
