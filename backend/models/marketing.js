module.exports = (sequelize, DataTypes) => {
  const Marketing = sequelize.define(
    "Marketing",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "marketings",
      timestamps: false,
    }
  );
    Marketing.associate = (models) => {
      Marketing.hasMany(models.Selling, {
        foreignKey: "marketing_id",
        as: "sellings",
      });
    };

  return Marketing;
};
