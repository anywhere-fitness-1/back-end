const db = require("../../data/dbConfig.js");

module.exports = {
  addClass,
  find,
  findById,
  findBy,
  update,
  remove,
  findClientClasses,
  addClientClass,
  addInstClass,
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

function findClientClasses(id, classID) {
  return db("clients")
    .join("client_classes", "client_classes.client_id", "clients.id")
    .join("classes", "client_classes.class_id", "classes.id")
    .select("client_id", "class_id", "clients.name")
    .where("client_classes.client_id", id);
}

function addClientClass(id, classId) {
  return db("client_classes").insert({ client_id: id, class_id: classId });
}

// function addClientClass(id, classId) {
//   return db("client_classes")
//     .join("clients", "clients.id", "client_classes.clientid")
//     .join("classes", "client_classes.class_id", "classes.id")
//     .insert({ client_id: id, class_id: classId });
// }
function addInstClass(classData, id) {
  return db("classes")
    .join("classes", "class_id", "instructor_id")
    .insert(classData)
    .where({ class_id: id });
}
