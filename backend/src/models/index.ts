import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';

//@ts-expect-error
import configFile from '../config/config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = (configFile as any)[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  const envValue = process.env[config.use_env_variable];
  if (!envValue) {
    throw new Error(
      `Environment variable ${config.use_env_variable} is not defined`
    );
  }
  sequelize = new Sequelize(envValue, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

async function loadModels() {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
    );

  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const modelUrl = pathToFileURL(modelPath).href;
    const modelImport = await import(modelUrl);
    const model = modelImport.default
      ? modelImport.default(sequelize, DataTypes)
      : modelImport(sequelize, DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

await loadModels();

async function associationsModels() {
    if (db.Llm && db.LlmModel) {
        db.Llm.belongsTo(db.LlmModel, {
            foreignKey: 'llm_model_id',
            as: 'llmModel',
        });
        db.LlmModel.hasMany(db.Llm, {
            foreignKey: 'llm_model_id',
            as: 'llms',
        });
    }
}

await associationsModels()

export default db;
