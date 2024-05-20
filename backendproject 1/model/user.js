const { string, object } = require('joi')
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const passwordComplexity =require('joi-password-complexity')

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true }, // Assuming date of birth is a Date type
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },   // Payload: Data to be encoded in the JWT
        process.env.JWT_PRIVATE_KEY, // Secret key used to sign the JWT
        { expiresIn: "7d" } // Options: Expiration time for the token
    );

    return token; // Returning the generated JWT
}


const User = mongoose.model("User",userSchema)




const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        dob: Joi.date().required().label("Date of Birth"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
    });

    return schema.validate(data);
};

// module.exports = validate;
module.exports = {User,validate}
