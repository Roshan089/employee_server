const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
 uniqueId: {
    type: Number,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  course: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  action: {
    edit: {
      type: String,
      default: 'Edit'
    },
    delete: {
      type: String,
      default: 'Delete'
    }
  }

});

module.exports=mongoose.model('Employee', employeeSchema);