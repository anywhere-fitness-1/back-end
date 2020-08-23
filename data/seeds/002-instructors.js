exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("instructors")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("instructors").insert([
        {
          id: 1,
          username: "davidwallace",
          password: "suckit",
          name: "David",
          specialties: "classic weight training, crossfit, cardio",
        },
        {
          id: 2,
          username: "janlevinson",
          password: "serenitybyjan",
          name: "Jan",
          specialties: "yoga, pilates, spin classes",
        },
        {
          id: 3,
          username: "robertcalifornia",
          password: "lizardking",
          name: "Robert",
          specialties: "MMA, krav maga, muay thai",
        },
      ]);
    });
};
