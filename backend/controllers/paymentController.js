const db = require("../models");

// POST /api/payments - Catat pembayaran kredit
exports.createPayment = async (req, res) => {
  try {
    const { selling_id, amount_paid, payment_date } = req.body;

    // Debug log
    console.log("Raw input:", { selling_id, amount_paid, payment_date });

    // Basic validation
    if (!selling_id || !amount_paid || !payment_date) {
      console.log("Validation failed:", {
        selling_id,
        amount_paid,
        payment_date,
      });
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // Get selling data first
    const selling = await db.Selling.findByPk(selling_id, {
      include: [
        {
          model: db.Payment,
          as: "payments",
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "grand_total",
        [
          db.sequelize.fn(
            "COALESCE",
            db.sequelize.fn("SUM", db.sequelize.col("payments.amount_paid")),
            0
          ),
          "total_paid",
        ],
      ],
      group: ["Selling.id"],
      raw: true,
    });

    if (!selling) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    // Calculate remaining bill
    const totalPaid = parseInt(selling.total_paid || 0);
    const billRemain = selling.grand_total - totalPaid;

    // Validate payment amount
    if (parseInt(amount_paid) > billRemain) {
      return res.status(400).json({
        error: `Jumlah bayar ${amount_paid} melebihi sisa tagihan ${billRemain}`,
      });
    }

    // Create payment
    const newPayment = await db.Payment.create({
      selling_id,
      amount_paid: parseInt(amount_paid),
      payment_date, // Use the date string directly
    });

    // Return success response
    res.status(201).json({
      success: true,
      payment: newPayment,
      total_paid: totalPaid + parseInt(amount_paid),
      bill_remain: billRemain - parseInt(amount_paid),
    });
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      error: "Gagal membuat pembayaran",
      details: error.message,
    });
  }
};

// GET /api/payments/:selling_id - Riwayat pembayaran
exports.getPaymentHistory = async (req, res) => {
  try {
    const { selling_id } = req.params;

    const selling = await db.Selling.findByPk(selling_id, {
      include: [
        {
          model: db.Payment,
          as: "payments",
          attributes: ["id", "amount_paid", "payment_date"],
        },
      ],
    });

    if (!selling) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    // Hitung total terbayar
    const totalPaid = selling.payments.reduce(
      (sum, payment) => sum + payment.amount_paid,
      0
    );

    // Format response
    const response = {
      selling_id: selling.id,
      transaction_number: selling.transaction_number,
      grand_total: selling.grand_total,
      total_paid: totalPaid,
      bill_remain: selling.grand_total - totalPaid,
      payment_history: selling.payments.map((p) => ({
        id: p.id,
        amount_paid: p.amount_paid,
        payment_date: p.payment_date,
      })),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
