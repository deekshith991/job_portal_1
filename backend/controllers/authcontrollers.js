import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Accounts from "../Models/Accounts.model.js";
import Companies from "../Models/companies.model.js";
import Users from "../Models/Users.model.js";

const SECRET_KEY = process.env.HASH_KEY || 'your_secret_key';

// Register User or Company
export const register = async (req, res) => {
  const { email, password, account_Type } = req.body;

  try {
    const existingAccount = await Accounts.findOne({ email });
    if (existingAccount) return res.status(400).json({ message: "Account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Accounts({
      email,
      password: hashedPassword,
      account_Type,
      status: "pending"
    });
    await newAccount.save();

    if (account_Type === "user") {
      const newUser = new Users({ Aid: newAccount._id, email });
      await newUser.save();
    } else if (account_Type === "company") {
      const newCompany = new Companies({ Aid: newAccount._id, email });
      await newCompany.save();
    } else {
      return res.status(400).json({ message: "Invalid account type" });
    }

    const token = jwt.sign({ id: newAccount._id, email: newAccount.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
      message: `${account_Type.charAt(0).toUpperCase() + account_Type.slice(1)} registered successfully`,
      account_id: newAccount._id,
      token
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

    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: account._id, email: account.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Logged in successfully", token, account_id: account._id });
  } catch (error) {
    console.error("Error @login", error);
    res.status(500).json({ message: "Server error" });
  }
};

