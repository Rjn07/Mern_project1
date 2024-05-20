// Importing Joi for data validation
const Joi = require("joi"); // Corrected: Changed 'data' to 'Joi' for consistency and proper usage
// Importing the validate function from the user model
const { validate } = require("../model/user");
// Importing the User model (assuming it's defined somewhere else)
const User = require("../model/user"); // Corrected: Added missing import for User model
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Route for user login
router.post("/", async (req, res) => { 
    try {
    
        // Validate the request body using the validate function from the user model
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message }); // Sending a 400 response if validation fails

        // Check if a user with the given email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send({ message: "Invalid Email or Password" }); // Sending a 400 response if user doesn't exist

        // Compare the provided password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send({ message: "Invalid Email or Password" }); // Sending a 400 response if password is invalid

        // If email and password are valid, generate an authentication token
        const token = user.generateAuthToken(); // Assuming generateAuthToken is a method of the User model
        // Sending a 200 response with the generated token
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        // Sending a 500 response if any error occurs during the process
        res.status(500).send({ message: "Internal server error" });
    }
});

// Validation function for validating user input data
const validateInput = (data) => {
    
    // Define Joi schema for validation
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    // Validate input data against the defined schema
    return schema.validate(data);
};

module.exports = router;
