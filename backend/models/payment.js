'use strict';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      amount_paid: DataTypes.INTEGER,
      payment_date: DataTypes.DATEONLY,
    },
    {
      tableName: "payments",
      timestamps: true,
      underscored: true, 
      createdAt: "created_at", 
      updatedAt: "updated_at", 
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Selling, {
      foreignKey: "selling_id",
      as: "selling",
    });
  };

  return Payment;
};