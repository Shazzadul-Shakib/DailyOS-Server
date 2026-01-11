import { Server } from 'http';
import { prisma } from './app/config/db';
import app from './app';
import { envConfig } from './app/config';

let server: Server;

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database Connected');
  } catch (error) {
    console.log('DB connection failed', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const main = async () => {
  await connectToDB();

  server = app.listen(envConfig.PORT, () => {
    console.log(`Server is running to the port ${envConfig.PORT}`);
  });
};

main();

// handling the uncaught exception
process.on('uncaughtException', () => {
  console.log(`Uncaught exception has occurred, shutting down the server`);
  process.exit(1);
});

// handling the unhandled rejections
process.on('unhandledRejection', () => {
  console.log(
    `Sorry we are facing unhandled rejection, shutting down the server`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
