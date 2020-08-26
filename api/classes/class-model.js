const db = require("../../data/dbConfig.js");

module.exports = {
  addClass,
  find,
  findById,
  findBy,
  update,
  remove,
  findClientClasses,
  addClientToClass,
  addInstClass,
  findClasses,
};

function find() {
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
    .select("client_id", "class_id", "clients.name", "classes.name")
    .where("client_classes.client_id", id);
}

// function addClientToClass(id, classId) {
//   return db("client_classes", "classes.name").insert({
//     client_id: id,
//     class_id: classId,
//   });
// }
function addClientToClass(id, clientData) {
  return db("client_classes", "classes.name").insert({
    class_id: id,
    client_id: clientData,
  });
}

function addInstClass(classData, id) {
  return db("classes")
    .join("classes", "class_id", "instructor_id")
    .insert(classData)
    .where({ class_id: id });
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
