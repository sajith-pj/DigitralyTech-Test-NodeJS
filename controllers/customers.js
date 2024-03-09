const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");

const getCustomersList = async (req, res) => {
  try {
    const customers = await Customer.find({ isDeleted: false });
    return res.status(200).json({
      messages: "Customers list fetched successfully",
      data: customers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messages: "Something went wrong" });
  }
};

const createCustomer = async (req, res) => {
  // Validation for the required data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check if customer with same email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: "Customer already exist with same email address" });
    }

    // If email does not exist, create a new customer
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer created successfully", data: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

const updateCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const customerId = req.params.id;
  const update = req.body;

  try {
    // Check if customer exists
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update customer
    await Customer.findByIdAndUpdate(customerId, update);
    const updatedCustomer = await Customer.findById(customerId);
    res.json({ data: updatedCustomer, message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    // Check if customer exists
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Soft delete customer by updating the deleted field
    await Customer.findByIdAndUpdate(customerId, { isDeleted: true });
    res.json({ message: "Deleted successfully", data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", data: {} });
  }
};

module.exports = {
  getCustomersList,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
