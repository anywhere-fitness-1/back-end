exports.seed = function (knex) {
  return knex("client_classes")
    .truncate()
    .then(function () {
      return knex("client_classes").insert([
        { class_id: 1, client_id: 1 },
        { class_id: 2, client_id: 2 },
        { class_id: 3, client_id: 3 },
      ]);
    });
};
