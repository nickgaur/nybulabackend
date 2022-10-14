const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "email id required"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  status: {
    type: Boolean,
    default: true,
  },
  appointmentsTaken: [{
    type: Schema.Types.ObjectId,
    ref: "appointments"
  }],
  appointmentsGiven: [{
    type: Schema.Types.ObjectId,
    ref: "appointments"
  }]
})

module.exports = mongoose.model('User', userSchema);