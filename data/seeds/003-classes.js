exports.seed = function (knex) {
  return knex("classes")
    .truncate()
    .then(function () {
      return knex("classes").insert([
        {
          id: 1,
          name: "The Murph",
          type: "Crossfit",
          time: "9 am",
          duration: "1 hr",
          intensity: "hard",
          location: "Omaha, NE",
          attendees: "14",
          maxClassSize: "20",
          instructor_id: 1,
        },
        {
          id: 2,
          name: "Vinyasa Flow",
          type: "Yoga",
          time: "7 am",
          duration: "45 mins",
          intensity: "medium",
          location: "Hollywood, FL",
          attendees: "17",
          maxClassSize: "30",
          instructor_id: 2,
        },
        {
          id: 3,
          name: "Boot Camp",
          type: "Cross Training",
          time: "8 am",
          duration: "1 hr",
          intensity: "hard",
          location: "Austin, TX",
          attendees: "9",
          maxClassSize: "16",
          instructor_id: 3,
        },
      ]);
    });
};
