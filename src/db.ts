import { ConnectionOptions, createConnection } from "typeorm";
import { Cat } from "./entities/cat";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname + "../.env") });

export const connectDB = async () => {
  const options: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "me",
    password: process.env.DEV_DB_PASSWORD,
    database: "cat_wiki",
    entities: [Cat],
    synchronize: true,
    // ssl: { rejectUnauthorized: false },
  };

  if (process.env.NODE_ENV === "production") {
    Object.assign(options, {
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }

  await createConnection(options);
};
