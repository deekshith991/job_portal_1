
import Users from "../Models/Users.model.js";
import Companies from "../Models/companies.model.js";

// Retrieve User Profile by ID
export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ Aid: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = { email: user.email, profile: user.profile };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve Company Profile by ID
export const getCompanyProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findOne({ Aid: id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const data = { email: company.email, profile: company.profile };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

