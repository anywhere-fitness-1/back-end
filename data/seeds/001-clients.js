exports.seed = function (knex) {
  return knex("clients")
    .truncate()
    .then(function () {
      return knex("clients").insert([
        {
          id: 1,
          username: "mscott",
          password: "bestbossever",
          name: "Michael",
          about: "I'm just a 44 year old man with a paper route.",
        },
        {
          id: 2,
          username: "dwigt",
          password: "bearsbeetsbattlestargalactica",
          name: "Dwight",
          about:
            "How would I describe myself? Three words: hard working, alpha male, jackhammer, merciless, insatiable.",
        },
        {
          id: 3,
          username: "jim",
          password: "bigtuna",
          name: "Jim",
          about: "6'11 weighing 90 lbs",
        },
      ]);
    });
};
