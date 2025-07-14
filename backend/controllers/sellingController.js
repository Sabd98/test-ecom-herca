const db = require("../models");

// routes/salesRoutes.js
exports.getSellings = async (req, res) => {
  try {
    const sales = await db.Selling.findAll({
      attributes: [
        "id",
        "transaction_number",
        "date",
        "grand_total",
        [
          db.sequelize.literal(
            '(SELECT COALESCE(SUM("payments"."amount_paid"), 0) FROM "payments" WHERE "payments"."selling_id" = "Selling"."id")'
          ),
          "total_paid",
        ],
      ],
      include: [
        {
          model: db.Marketing,
          as: "marketing",
          attributes: ["id", "name"],
        },
      ],
      raw: false,
    });

    // Perbaiki mapping response
    res.json(
      sales.map((sale) => ({
        id: sale.id,
        transaction_number: sale.transaction_number,
        date: sale.date,
        grand_total: sale.grand_total,
        marketing: sale.marketing,
        total_paid: parseInt(sale.get("total_paid") || 0),
        bill_remain: sale.grand_total - (parseInt(sale.get("total_paid")) || 0),
      }))
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// routes/salesRoutes.js
exports.getSelling = async (req, res) => {
 try {
   const sale = await db.Selling.findByPk(req.params.id, {
     include: [
       { model: db.Marketing, attributes: ["id", "name"], as: "marketing" },
       {
         model: db.Payment,
         attributes: ["id", "amount_paid", "payment_date"],
         as: "payments",
       },
     ],
   });

   if (!sale) {
     return res.status(404).json({ error: "Transaksi tidak ditemukan" });
   }

   // Hitung total terbayar
   const totalPaid = sale.payments.reduce(
     (sum, payment) => sum + payment.amount_paid,
     0
   );

   res.json({
     id: sale.id,
     transaction_number: sale.transaction_number,
     date: sale.date,
     grand_total: sale.grand_total,
     marketing: sale.Marketing,
     total_paid: totalPaid,
     bill_remain: sale.grand_total - totalPaid,
     Payments: sale.Payments,
   });
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
};
