import db from "../db";
import seedData from "./seedSchema";
import * as logger from "../../logger";

export default function dropAndSeedSchema() {
  db.connection.dropDatabase(err => {
    if (err) {
      logger.logError("Error while dropping database.");
      throw err;
    }
    logger.logInfo("Database was dropped");
  }).then(() => {
    logger.logInfo("Database is created.");
    seedData().then(() => {
      logger.logInfo("Database is seeded.");
    });
  });
}
