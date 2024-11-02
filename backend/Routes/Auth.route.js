
import express from "express";
const router = express.Router();
import Users from "../Models/Users.model.js";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hashing

    const newUser = new Users({ email, password: password });
    await newUser.save();

    // tokens
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error, "Error @register ");
    res.status(500).json({ message: "Server error " });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //password hashing

  try {
    const user = await Users.findOne({ email, password });

    //tokens
    res.status(200).json({ message: "Logging in", user_id: user._id });

  } catch (err) {
    console.log(err, `Error Authenticating ${email}`);
    res.status(500).json({ message: "Error Authenticating" });
  }
})

export default router;

