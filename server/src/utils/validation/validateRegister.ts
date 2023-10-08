import { body } from "express-validator";

function validateRegister() {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Your name should be at least 3 characters long."),
    body("email").isEmail().withMessage("Fill in a valid email address."),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Your password should at least be 3 characters long."),
  ];
}

export default validateRegister;
