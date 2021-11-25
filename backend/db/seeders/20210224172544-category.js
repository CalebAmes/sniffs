"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "tug of war",
        description:
          "a contest in which two teams pull at opposite ends of a rope until one drags the other over a central line",
      },
      {
        name: "walkies",
        description:
          'What does dog walk mean? ... The slang dog walk is "to overpower" or "outsmart" someone, as if in utter control of them, as when walking a dog.',
      },
      {
        name: "fetch",
        description:
          "go for and then bring back (someone or something) for someone.",
      },
      {
        name: "dog dancing",
        description:
          "Musical canine freestyle, also known as musical freestyle, freestyle dance, and canine freestyle, is a modern dog sport that is a mixture of obedience training, tricks, and dance that allows for creative interaction between dogs and their owners.",
      },
      {
        name: "swimming, but for dogs",
        description:
          "Can all dogs swim? With a life vest and some dog swimming lessons from you, every breed should be able to get around in the water.",
      },
      {
        name: `car rides`,
        description: `In California, it's perfectly legal to drive with your pet on your lap or unrestrained in your car. Just don't let the dogs drive!`,
      },
      {
        name: "frisbee",
        description:
          "BLUE COLOR FOR MAXIMUM DOG VISIBILITY: Bright colors like green, orange, yellow and red stand out to human eyes, but the dog color visibility spectrum is different. For your furry friend, the most distinct and bright color is blue. Give a blue Frisbee a try and see the difference!",
      },
      {
        name: "butt sniffing",
        description:
          '"Because the odor is unique to every dog, two dogs can quickly determine if they have met before." Dogs sniff rear ends as a form of greeting and obtain vital information from the anal secretions.',
      },
      {
        name: "treatos",
        description: "nom, nom, nom",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", {});
  },
};
