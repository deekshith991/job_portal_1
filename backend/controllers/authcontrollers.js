import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Accounts from "../Models/Accounts.model.js";
import Companies from "../Models/companies.model.js";
import Users from "../Models/Users.model.js";
import logger from "../middleware/logger.js";

const SECRET_KEY = process.env.HASH_KEY || 'your_secret_key';

// Register User or Company
export const register = async (req, res) => {
  const { email, password, accountType } = req.body;

  try {
    logger.info("Registering new account", { email, accountType });

    // Check if the account already exists
    const existingAccount = await Accounts.findOne({ email });
    if (existingAccount) {
      logger.warn("Registration attempt for existing account", { email });
      return res.status(400).json({ message: "Account already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new account with status 'pending'
    const newAccount = new Accounts({
      email,
      password: hashedPassword,
      accountType,
      status: "pending",
    });
    await newAccount.save();

    // Create the respective user or company based on accountType
    if (accountType === "user") {
      const newUser = new Users({ Aid: newAccount._id, email });
      await newUser.save();
    } else if (accountType === "company") {
      const newCompany = new Companies({ Aid: newAccount._id, email, accountType });
      await newCompany.save();
    } else {
      logger.error("Invalid account type during registration", { accountType });
      return res.status(400).json({ message: "Invalid account type" });
    }

    // Generate a token for the new account
    const token = jwt.sign({ id: newAccount._id, email: newAccount.email }, SECRET_KEY, { expiresIn: "1h" });

    logger.info("Registration successful", { email, accountType, accountId: newAccount._id });
    res.status(201).json({
      message: `${accountType.charAt(0).toUpperCase() + accountType.slice(1)} registered successfully`,
      accountId: newAccount._id,
      token,
      accountType
    });
  } catch (error) {
    logger.error("Error @register", { error: error.message });
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    logger.info("Login attempt", { email });

    const account = await Accounts.findOne({ email });
    if (!account) {
      logger.warn("Login failed - invalid credentials", { email });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    if (!isPasswordCorrect) {
      logger.warn("Login failed - incorrect password", { email });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: account._id, email: account.email }, SECRET_KEY, { expiresIn: "1h" });

    logger.info("Login successful", { email, accountId: account._id });
    res.status(200).json({
      message: "Logged in successfully",
      token,
      accountId: account._id,
      accountType: account.accountType,
    });
  } catch (error) {
    logger.error("Error @login", { error: error.message });
    res.status(500).json({ message: "Server error" });
  }
};

// Update Account Status
export const updateStatus = async (req, res) => {
  const { accountId, status } = req.body;

  try {
    logger.info("Updating account status", { accountId, newStatus: status });

    if (!["active", "suspended"].includes(status)) {
      logger.warn("Invalid status value in updateStatus", { status });
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(accountId, { status }, { new: true });
    if (!updatedAccount) {
      logger.warn("Account not found in updateStatus", { accountId });
      return res.status(404).json({ message: "Account not found" });
    }

    logger.info("Account status updated successfully", { accountId, status });
    res.status(200).json({ message: `Account status updated to ${status}`, updatedAccount });
  } catch (error) {
    logger.error("Error @updateStatus", { error: error.message });
    res.status(500).json({ message: "Server error" });
  }
};
