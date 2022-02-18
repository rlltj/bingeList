const { body } = require('express-validator');

const registerValidation = [
    // Name should not be empty
    body('fname').not().isEmpty().withMessage("First Name is required."),
    body('lname').not().isEmpty().withMessage("Last Name is required."),
    body('uname').not().isEmpty().withMessage("Username is required."),

    // Password needs to be min 6 chars
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    body('avatar').not().isEmpty().withMessage("Avatar is required."),
];

const loginValidation = [
  // Email should not be empty and must be a valid email
  body('uname').not().isEmpty().withMessage("Username is required."),
  // Password should not be empty and needs to be min 6 chars
  body('password').not().isEmpty().withMessage("Password is required.")
];

const listValidation = [
    body('ltname').not().isEmpty().withMessage("List name is required."),
    body('privacy').not().isEmpty().withMessage("Privacy selection is required.")
];

// update exports
module.exports = { registerValidation, loginValidation, listValidation };