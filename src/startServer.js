import server from './server';

process.on('uncaughtException', (err) => {
  const stack = err.stack;
  console.log(`Uncaught exception. ${stack}`);
});

server.start();
