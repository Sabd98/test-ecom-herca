module.exports = (sequelize, DataTypes) => {
  const Selling = sequelize.define(
    "Selling",
    {
      transaction_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marketing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Marketings",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cargo_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grand_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "sellings",
      timestamps: false,
    }
  );

  Selling.associate = (models) => {
    Selling.belongsTo(models.Marketing, {
      foreignKey: "marketing_id",
      as: "marketing",
    });
     Selling.hasMany(models.Payment, {
       foreignKey: "selling_id",
       as: "payments",
     });
  };

  return Selling;
};
