exports.up = function (knex) {
  return knex.schema
    .createTable("clients", (tbl) => {
      tbl.increments();
      tbl.text("username").notNullable();
      tbl.text("password").notNullable();
      tbl.text("name");
      tbl.text("about");
    })
    .createTable("instructors", (tbl) => {
      tbl.increments();
      tbl.text("username").notNullable();
      tbl.text("password").notNullable();
      tbl.text("name");
      tbl.text("specialties");
    })
    .createTable("classes", (tbl) => {
      tbl.increments();
      tbl.text("name").notNullable();
      tbl.text("type").notNullable();
      tbl.text("time").notNullable();
      tbl.text("duration").notNullable().unsigned();
      tbl.text("intensity").notNullable();
      tbl.text("location").notNullable();
      tbl.integer("attendees").notNullable();
      tbl.integer("maxClassSize").notNullable().unsigned();
      tbl
        .integer("instructor_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("instructors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("client_classes", (tbl) => {
      tbl
        .integer("class_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("client_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("clients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["class_id", "client_id"]);
    })
    .createTable("instructor_classes", (tbl) => {
      tbl
        .integer("class_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("classes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("instructor_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("instructor")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["class_id", "instructor_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExist("instructor_classes")
    .dropTableIfExist("client_classes")
    .dropTableIfExist("classes")
    .dropTableIfExist("instructors")
    .dropTableIfExist("clients");
};
