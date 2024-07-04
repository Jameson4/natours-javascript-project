const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

console.log(process.env);

mongoose.connect(DB).then(() => {
  console.log('DB Connection successful');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Listening on port ${port}...`);
});
