const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('DB Connection successful');
});

//Readfile
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await tour.create(tours);
    console.log('Data added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const clearDB = async () => {
  try {
    await tour.deleteMany();
    console.log('Data Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  clearDB();
}

console.log(process.argv);
