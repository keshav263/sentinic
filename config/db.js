const mongoose = require("mongoose");
const chalk = require("chalk");

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {});
    console.log(chalk.magentaBright("Mongo DB connected"));
  } catch (error) {
    console.log(chalk.redBright(error.message));
    throw error;
  }
};

module.exports = connectDB;
