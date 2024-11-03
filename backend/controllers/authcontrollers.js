import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Companies from "../Models/companies.model.js";
import Users from "../Models/Users.model.js";
import { log } from '../middleware/logger.js';

const SECRET_KEY = process.env.HASH_KEY || 'your_secret_key'; // Replace with a secure key in .env

// Company Registration Controller
export const company_register = async (req, res) => {
  const { email, password } = req.body;

  try {

    const existingCompany = await Companies.findOne({ email });
    if (existingCompany) return res.status(400).json({ message: "Company already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Companies({ email, password: hashedPassword, profile: { status: "pending" } });
    await newCompany.save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error(error, "Error @company_register");
    res.status(500).json({ message: "Server error" });
  }
};

export const company_login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const company = await Companies.findOne({ email });
    if (!company) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, company.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: company._id, email: company.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Logged in successfully", token, company_id: company._id });
  } catch (error) {
    console.error(error, "Error @company_login");
    res.status(500).json({ message: "Server error" });
  }
};

export const user_register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    log(`[=] Registering ${email}`);
    const newUser = new Users({ email, password: hashedPassword, profile: { status: "pending" } });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error, "Error @user_register");
    res.status(500).json({ message: "Server error" });
  }
};

export const user_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    log(`[=] ${email} is logging in`);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    log(`[=] ${email} successfully Logged In`);
    res.status(200).json({ message: "Logged in successfully", token, user_id: user._id });
  } catch (error) {
    console.error(error, `Error Authenticating ${email}`);
    res.status(500).json({ message: "Error Authenticating" });
  }
};

