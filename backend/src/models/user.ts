export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      youtube_access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      youtube_refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      youtube_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_admin: { // <-- Ajout ici
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  User.associate = function (models: unknown) {
    // Exemple d'association (à adapter selon vos besoins)
    // User.belongsToMany(models.Llm, { through: models.LlmUser, foreignKey: 'user_id' });
    // User.hasMany(models.LlmUser, { foreignKey: 'user_id' });
  };

  return User;
};
