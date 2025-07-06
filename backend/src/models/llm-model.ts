import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const LlmModel = sequelize.define(
    "LlmModel",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      llm_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Llms',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "llm_models",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );


  return LlmModel;
};
