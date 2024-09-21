const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");
const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
   
});

exports.SignUp = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    console.log(error);
    
   if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password, mobileNo } = req.body;

    const alreadyExisting = await Users.findOne({ email });
    if (alreadyExisting) {
      return res.status(400).json({
        success: false,
        message: "User is already registered."
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      mobileNo 
    });

    return res.status(201).json({
      success: true,
      message: "User is signed up successfully."
    });
  } catch (err) {
    
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "There is an error on the server side."
    });
  }
};
