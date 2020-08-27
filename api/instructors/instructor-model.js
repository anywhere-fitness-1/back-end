const db = require("../../data/dbConfig.js");
const classes = require("../classes/class-model.js");

module.exports = {
  add,
  find,
  findById,
  findBy,
  update,
  remove,
  addInstClass,
};

function find() {
  return db("instructors")
    .select("id", "username", "password", "name", "specialties")
    .orderBy("id");
}

function findById(id) {
  return db("instructors").where({ id });
}

function findBy(filter) {
  return db("instructors")
    .select("id", "username", "password", "name", "specialties")
    .where(filter);
}

function add(instructor) {
  return db("instructors")
    .insert(instructor, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
  return db("instructors")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  return db("instructors").where({ id }).del();
}

function addInstClass(classData, id) {
  return db("classes")
    .join("classes", "class_id", "instructor_id")
    .insert(classData)
    .where({ class_id: id });
}
