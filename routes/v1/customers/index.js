var express = require("express");
const {
  getCustomersList,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../../../controllers/customers");
const { body } = require("express-validator");
var router = express.Router();

router.get("/list", getCustomersList);

router.post(
  "/list",
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .isEmail()
    .withMessage("Please enter a proper email"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isLength({ max: 10, min: 10 })
    .withMessage("Please enter a valid phone number"),
  body("address.street").notEmpty().withMessage("Street is required"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.state").notEmpty().withMessage("State is required"),
  body("address.zip").notEmpty().withMessage("Zip code is required"),
  body("address.country").notEmpty().withMessage("Country is required"),
  createCustomer
);
router.put(
  "/list/:id",
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .isEmail()
    .withMessage("Please enter a proper email"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isLength({ max: 10, min: 10 })
    .withMessage("Please enter a valid phone number"),
  body("address.street").notEmpty().withMessage("Street is required"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.state").notEmpty().withMessage("State is required"),
  body("address.zip").notEmpty().withMessage("Zip code is required"),
  body("address.country").notEmpty().withMessage("Country is required"),
  updateCustomer
);

router.delete("/list/:id", deleteCustomer);

module.exports = router;
