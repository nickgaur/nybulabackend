const mongoose = require('mongoose');

const dbUrl = "mongodb://localhost:27017/nybula";

mongoose.connect(dbUrl).then(() => {
  console.log("DATABASE CONNECTED!!");
})
.catch((err) => {
  throw err;
});