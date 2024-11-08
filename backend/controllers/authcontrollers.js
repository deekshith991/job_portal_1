import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Accounts from "../Models/Accounts.model.js";
import Companies from "../Models/companies.model.js";
import Users from "../Models/Users.model.js";

const SECRET_KEY = process.env.HASH_KEY || 'your_secret_key';

// Register User or Company
export const register = async (req, res) => {
  const { email, password, accountType } = req.body;

  try {
    // Check if the account already exists
    const existingAccount = await Accounts.findOne({ email });
    if (existingAccount) return res.status(400).json({ message: "Account already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new account with status 'pending'
    const newAccount = new Accounts({
      email,
      password: hashedPassword,
      accountType,
      status: "pending",  // Default status is 'pending'
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
      return res.status(400).json({ message: "Invalid account type" });
    }

    // Generate a token for the new account
    const token = jwt.sign({ id: newAccount._id, email: newAccount.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
      message: `${accountType.charAt(0).toUpperCase() + accountType.slice(1)} registered successfully`,
      account_id: newAccount._id,
      token,
      accountType
    });
  } catch (error) {
    console.error("Error @register", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Accounts.findOne({ email });
    if (!account) return res.status(400).json({ message: "Invalid credentials" });

    // if (account.status !== "active") {
    //   return res.status(400).json({ message: "Account is not active" });
    // }

    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: account._id, email: account.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      account_id: account._id,
      accountType: account.accountType,  // Corrected from 'account_Type'
    });
  } catch (error) {
    console.error("Error @login", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStatus = async (req, res) => {
  const { accountId, status } = req.body;

  try {
    if (!["active", "suspended"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(accountId, { status }, { new: true });
    if (!updatedAccount) return res.status(404).json({ message: "Account not found" });

    res.status(200).json({ message: `Account status updated to ${status}`, updatedAccount });
  } catch (error) {
    console.error("Error @updateStatus", error);
    res.status(500).json({ message: "Server error" });
  }
};

