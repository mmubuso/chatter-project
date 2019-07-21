//Import mongoose package 
const mongoose = require('mongoose');

//Depending on environment database can be placed locally on monogo server
const connectionString = process.env.MONGODB_URI || "mongodb://localhost/chatter";

//method used to connecect to monogoDB
mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });

module.exports = mongoose
