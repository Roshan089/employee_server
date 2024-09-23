const Employee = require("../models/EmployeeS");



exports.Getemployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    
    
      res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employees", error });
  }
};

