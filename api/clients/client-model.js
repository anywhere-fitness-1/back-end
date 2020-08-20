const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  findBy,
  update,
  remove,
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
  return db("clients").select("username", "password").where(filter);
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
