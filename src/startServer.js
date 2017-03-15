import server from './server';

process.on('uncaughtException', function (err) {
  let stack = err.stack;
  console.log(`Uncaught exception. ${stack}`);
});

server.start();
