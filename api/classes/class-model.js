const db = require("../../data/dbConfig.js");

module.exports = {
  addClass,
  find,
  findById,
  findBy,
  update,
  remove,
};

function find() {
  return db("classes")
    .select(
      "id",
      "name",
      "type",
      "time",
      "duration",
      "intensity",
      "location",
      "attendees",
      "maxClassSize",
      "instructor_id"
    )
    .orderBy("id");
}

function findById(id) {
  return db("classes").where({ id });
}

function findBy(filter) {
  return db("classes").select("name", "time").where(filter);
}

function addClass(classData) {
  return db("classes")
    .insert(classData, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
  return db("classes")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  return db("classes").where({ id }).del();
}
