module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("marketings", [
      { id: 1, name: "Alfandy" },
      { id: 2, name: "Mery" },
      { id: 3, name: "Danang" },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("marketings", null, {});
  },
};
