const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception, restarting...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB Connection successful');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection, restarting...');
  server.close(() => {
    process.exit(1);
  });
});
