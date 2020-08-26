exports.seed = function (knex) {
  return knex("client_classes")
    .truncate()
    .then(function () {
      return knex("client_classes").insert([{ class_id: 99, client_id: 99 }]);
    });
};
