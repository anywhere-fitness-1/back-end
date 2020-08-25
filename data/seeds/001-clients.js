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
          image:
            "https://www.bluleadz.com/hs-fs/hubfs/Blog_pics/PrisonMike.jpeg?width=535&name=PrisonMike.jpeg",
        },
        {
          id: 2,
          username: "dwigt",
          password: "bearsbeetsbattlestargalactica",
          name: "Dwight",
          about:
            "How would I describe myself? Three words: hard working, alpha male, jackhammer, merciless, insatiable.",
          image:
            "https://s3.amazonaws.com/spoonuniversi-wpengine/spoonuniversi/wp-content/uploads/sites/240/2016/04/Screen-Shot-2016-04-11-at-11.41.48-PM.png",
        },
        {
          id: 3,
          username: "jim",
          password: "bigtuna",
          name: "Jim",
          about: "6'11 weighing 90 lbs",
          image: "https://miro.medium.com/max/2510/0*Xz-_cHSO6txphvHt.png",
        },
      ]);
    });
};
