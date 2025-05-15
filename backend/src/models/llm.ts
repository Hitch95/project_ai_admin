import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Llm = sequelize.define(
    "Llm",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "llms",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  Llm.associate = function (models: any) {
    // Exemple d'association (à adapter selon vos besoins)
    // Llm.hasMany(models.LlmModel, { foreignKey: 'llm_id' });
    // Llm.belongsToMany(models.User, { through: models.LlmUser, foreignKey: 'llm_id' });
  };

  return Llm;
};
