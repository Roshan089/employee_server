const Employee = require("../models/EmployeeS");



exports.Getemployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log(employees);
    
      res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employees", error });
  }
};
/*
// API Endpoints for CRUD operations
app.post('/api/employee', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.send(employee);
});


exports.Getemployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employees", error });
  }
};





app.put('/api/employee/:id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(employee);
});

app.delete('/api/employee/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: 'Employee deleted' });
});
*/