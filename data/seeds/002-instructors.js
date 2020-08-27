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
          image: "https://i.redd.it/kcy9t6mobh841.jpg",
        },
        {
          id: 2,
          username: "janlevinson",
          password: "serenitybyjan",
          name: "Jan",
          specialties: "yoga, pilates, spin classes",
          image:
            "https://www.telegraph.co.uk/content/dam/business/2016/06/10/Jan_Levinson-Gould_NBC_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg?imwidth=450",
        },
        {
          id: 3,
          username: "robertcalifornia",
          password: "lizardking",
          name: "Robert",
          specialties: "MMA, krav maga, muay thai",
          image:
            "https://img1.looper.com/img/gallery/the-truth-about-robert-california-from-the-office/intro-1583335474.jpg",
        },
      ]);
    });
};
