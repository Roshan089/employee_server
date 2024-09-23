const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeS");
const Joi = require('joi');


//import controller
const {SignUp} = require("../controllers/SignUp");
const {login} = require("../controllers/login");
const { Getemployee, deleteemp } = require("../controllers/employee");


//routes
router.post("/signup",SignUp);
router.post("/login", login);
router.get("/employees", Getemployee);  
router.delete('/delete/:id', async (req, res) => {
    const  id  = req.params.id
    console.log(id);
    const data = await Employee.deleteOne({ _id: id })
    res.send({ success: true, message: " deleted", data: data });
    
   
});


router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
    
  }
});




// Validation schema
const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNo: Joi.string().pattern(/^[0-9]{10}$/).required(), // Example for mobile number format
  designation: Joi.string().required(),
  gender: Joi.string().valid('M', 'F').required(),
  course: Joi.array().required()
});

router.post('/newemployees', async (req, res) => {
  try {
    // Validate input
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Create new employee instance
    const { name, email, mobileNo, designation, gender, course } = req.body;
    const data = new Employee({ name, email, mobileNo, designation, gender, course });

    console.log("Server received: ", data);

    // Save to database
    await data.save();

    console.log("Data saved successfully");

    // Respond with a success message
    res.status(201).json({ message: "Item saved to database" });
  } catch (error) {
    console.error(error);
    // Send an error message with a 500 status if saving fails
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => { 
  try {
    const id = req.params.id;
    console.log(id);
    const{ name }= req.body

    console.log("name",name);
    
    const empExists = await Employee.findById(id);
    console.log(empExists);
    
    if (!empExists)
      return res.status(401).json({ message: "employee not found" })
    console.log("body:",req.body);
    
    const updateEmp= await Employee.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updateEmp);
    console.log("respons:",updateEmp);
    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

})


module.exports = router;