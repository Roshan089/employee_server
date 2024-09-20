const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const employeeSchema = new mongoose.Schema({
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
    required: true
  },
  course: {
    type: [String],  // Changed to array of strings
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
  },
  uniqueId: {
    type: String,
    default: uuidv4,  // Automatically assign a UUID if none is provided
    unique: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
