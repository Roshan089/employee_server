const Users = require("../models/Users");
const bcrypt = require("bcrypt");

exports.SignUp = async (req, res) => {
  try { 
    // Extract name, email, password from req
      const { name, email, password } = req.body;
      console.log();
      

    // Check if all fields are entered
    if (!name || !email || !password) {
      return res.status(400).json({  // Change to 400 Bad Request
        success: false,
        message: "Please enter all the data carefully."
      });
    }

    // Check if the user is already registered
    const alreadyExisting = await Users.findOne({ email });
    if (alreadyExisting) {
      return res.status(400).json({
        success: false,
        message: "User is already registered."
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await Users.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    return res.status(201).json({  // Use 201 Created for successful signup
      success: true,
      message: "User is signed up successfully."
    });
  } catch (err) {
    // Log the error for debugging
    console.error(err);  
    return res.status(500).json({
      success: false,
      message: "There is an error on the server side."
    });
  }
};