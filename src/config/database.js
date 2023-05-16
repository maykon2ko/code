const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.USER_ENV}:${process.env.PASS_ENV}@authlog.q1emkbz.mongodb.net/`,
      {
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongodb connected: ${conn.connection.host} 🏦`);
  } catch (error) {
    console.error(`Eerro no mongodb: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
