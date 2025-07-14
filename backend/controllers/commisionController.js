const { Op } = require("sequelize");
const db = require("../models");
const calculateCommission = require("../utils/commisionCalculator");

exports.getCommissions = async (req, res) => {
  try {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    console.log("Query params:", month, year);

    // Validasi input
    if (isNaN(month) || isNaN(year)) {
      return res.status(400).json({
        error: "Month and year must be valid numbers",
      });
    }
    

   const results = await db.Selling.findAll({
     attributes: [
       [
         db.sequelize.fn("SUM", db.sequelize.col("Selling.total_balance")),
         "omzet",
       ],
       [
         db.sequelize.fn(
           "EXTRACT",
           db.sequelize.literal('MONTH FROM "Selling".date')
         ),
         "month",
       ],
       [
         db.sequelize.fn(
           "EXTRACT",
           db.sequelize.literal('YEAR FROM "Selling".date')
         ),
         "year",
       ],
       "Selling.marketing_id",
     ],
     include: [
       {
         model: db.Marketing,
         as: "marketing",
         attributes: ["name"],
         required: true,
       },
     ],
     where: {
       [Op.and]: [
         db.sequelize.where(
           db.sequelize.fn(
             "EXTRACT",
             db.sequelize.literal('MONTH FROM "Selling".date')
           ),
           month
         ),
         db.sequelize.where(
           db.sequelize.fn(
             "EXTRACT",
             db.sequelize.literal('YEAR FROM "Selling".date')
           ),
           year
         ),
       ],
     },
     group: [
       "Selling.marketing_id",
       "marketing.id",
       "marketing.name",
       db.sequelize.fn(
         "EXTRACT",
         db.sequelize.literal('MONTH FROM "Selling".date')
       ),
       db.sequelize.fn(
         "EXTRACT",
         db.sequelize.literal('YEAR FROM "Selling".date')
       ),
     ],
     raw: true,
     nest: true,
   });

    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const commissions = results.map((result) => {
      const omzet = parseInt(result.omzet);
      const commission = calculateCommission(omzet);

      return {
        marketing: result.marketing.name,
        bulan: monthNames[result.month - 1],
        tahun: result.year,
        omzet,
        komisi_persen: commission.percent,
        komisi_nominal: commission.nominal,
      };
    });

    res.json(commissions);
  } catch (error) {
    console.error("SQL Query:", error.sql);
    console.error("Error details:", error.original);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      details: error.original,
    });
  }
};
