const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeS");

//import controller
const {SignUp} = require("../controllers/SignUp");
const {login} = require("../controllers/login");
const {Auth,Student,Admin} = require("../Middleware/Auth");
const { Getemployee, deleteemp } = require("../controllers/employee");


//routes
router.post("/signup",SignUp);
router.post("/login", login);
router.get("/employees", Getemployee)
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




router.post('/newemployees', async (req, res) => {
  try {
    const data = new Employee(req.body);

    console.log("server i got: ", data);

    await data.save(); 
console.log("gaya data");

    // Respond with a success message after saving the item
    res.send("Item saved to database");
  } catch (error) {
     console.log(error);
    // Send an error message with a 400 status if saving fails
    res.status(400).json({ error: error.message });
  }
});


router.get("/test",Auth,(req,res)=>{
    res.status(200).json({
        success: true,
        message:"Welcome to the protected route for auth"
    })
})



module.exports = router;