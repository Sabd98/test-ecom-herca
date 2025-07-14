module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        id: 1,
        transaction_number: "TRX001",
        marketing_id: 1,
        date: new Date("2023-05-22"),
        cargo_fee: 25000,
        total_balance: 3000000,
      },
      {
        id: 2,
        transaction_number: "TRX002",
        marketing_id: 3,
        date: new Date("2023-05-22"),
        cargo_fee: 25000,
        total_balance: 320000,
      },
      {
        id: 3,
        transaction_number: "TRX003",
        marketing_id: 1,
        date: new Date("2023-05-22"),
        cargo_fee: 0,
        total_balance: 65000000,
      },
      {
        id: 4,
        transaction_number: "TRX004",
        marketing_id: 1,
        date: new Date("2023-05-23"),
        cargo_fee: 10000,
        total_balance: 70000000,
      },
      {
        id: 5,
        transaction_number: "TRX005",
        marketing_id: 2,
        date: new Date("2023-05-23"),
        cargo_fee: 10000,
        total_balance: 80000000,
      },
      {
        id: 6,
        transaction_number: "TRX006",
        marketing_id: 3,
        date: new Date("2023-05-23"),
        cargo_fee: 1200,
        total_balance: 44000000,
      },
      {
        id: 7,
        transaction_number: "TRX007",
        marketing_id: 1,
        date: new Date("2023-06-01"),
        cargo_fee: 0,
        total_balance: 75000000,
      },
      {
        id: 8,
        transaction_number: "TRX008",
        marketing_id: 2,
        date: new Date("2023-06-02"),
        cargo_fee: 0,
        total_balance: 85000000,
      },
      {
        id: 9,
        transaction_number: "TRX009",
        marketing_id: 2,
        date: new Date("2023-06-01"),
        cargo_fee: 0,
        total_balance: 175000000,
      },
      {
        id: 10,
        transaction_number: "TRX010",
        marketing_id: 3,
        date: new Date("2023-06-01"),
        cargo_fee: 0,
        total_balance: 75000000,
      },
      {
        id: 11,
        transaction_number: "TRX011",
        marketing_id: 2,
        date: new Date("2023-06-01"),
        cargo_fee: 0,
        total_balance: 750020000,
      },
      {
        id: 12,
        transaction_number: "TRX012",
        marketing_id: 3,
        date: new Date("2023-06-01"),
        cargo_fee: 0,
        total_balance: 130000000,
      },
    ];

    const dataWithGrandTotal = data.map((item) => ({
      ...item,
      grand_total: item.cargo_fee + item.total_balance,
    }));

    await queryInterface.bulkInsert("sellings", dataWithGrandTotal);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("sellings", null, {});
  },
};
