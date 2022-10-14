const mongoose = require('mongoose');
const { Schema } = mongoose;


const appointmentSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  agenda: {
    type: String,
    required: [true, "Agenda is required"]
  },
  date: {
    type: String,
    required: [true, "Date is Required"]
  },
  time: {
    type: String,
    required: true
  },
  guestUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }

})

module.exports = mongoose.model('appointments', appointmentSchema);