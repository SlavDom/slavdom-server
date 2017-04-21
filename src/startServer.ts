import "es6-promise";
import server from "./server";
import {logError} from "./logger";

process.on("uncaughtException", (err: Error) => {
  const stack = err.stack;
  logError(`Uncaught exception. ${stack}`);
});

server.start();
