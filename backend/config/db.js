// // config/db.js
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.k5wja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//     const conn = await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;
// config/db.js
const { MongoClient } = require("mongodb");

let dbConnection;
module.exports = {
  connectToDb: cb => {
    MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.k5wja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
      .then(client => {
        console.log("Connected to Database");
        dbConnection = client.db("search");
        return cb();
      })
      .catch(err => {
        console.log("Error connecting to Database", err);
        return cb();
      });
  },
  getDb: () => {
    return dbConnection;
  },
};
