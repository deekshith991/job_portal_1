import Users from "../Models/Users.model.js";
import Logger from "../middleware/logger.js";

// Controller to get user profile and education details
export const getUserProfile = async (req, res) => {
  const { accountId } = req.params;

  try {
    const user = await Users.findOne({ Aid: accountId });
    if (!user) {
      Logger.warn("User not found", { accountId });
      return res.status(404).json({ message: "User not found" });
    }

    Logger.info("User profile fetched successfully", { accountId });
    res.status(200).json({
      profile: user.profile,
      education: user.education || [],
    });
  } catch (error) {
    Logger.error("Failed to fetch user data", { error: error.message });
    res.status(500).json({ message: "Failed to fetch user data", error: error.message });
  }
};

// Controller to update user profile and education details
export const updateUserProfile = async (req, res) => {
  const { accountId } = req.params;
  const { profile, education } = req.body;

  try {
    const user = await Users.findOne({ Aid: accountId });
    if (!user) {
      Logger.warn("User not found", { accountId });
      return res.status(404).json({ message: "User not found" });
    }

    if (profile) {
      user.profile = { ...user.profile, ...profile };
      Logger.info("Profile data updated", { accountId, profile });
    }

    if (education && Array.isArray(education)) {
      const validLevels = [
        "1st Standard", "2nd Standard", "3rd Standard", "4th Standard", "5th Standard",
        "6th Standard", "7th Standard", "8th Standard", "9th Standard", "10th Standard",
        "Inter - 1st Year", "Inter - 2nd Year", "Degree - 1st Year", "Degree - 2nd Year",
        "Degree - 3rd Year", "BTech - 1st Year", "BTech - 2nd Year", "BTech - 3rd Year",
        "BTech - 4th Year", "PhD"
      ];

      for (let edu of education) {
        // Convert CGPA to a number if it's a string
        edu.CGPA = typeof edu.CGPA === 'string' ? parseFloat(edu.CGPA) : edu.CGPA;

        if (!validLevels.includes(edu.from) || !validLevels.includes(edu.to)) {
          Logger.warn("Invalid education level", { accountId, edu });
          return res.status(400).json({ message: `Invalid education year level for: ${edu.instituteName}` });
        }
        if (typeof edu.CGPA !== "number" || isNaN(edu.CGPA) || edu.CGPA < 0 || edu.CGPA > 10) {
          Logger.warn("Invalid CGPA value", { accountId, edu });
          return res.status(400).json({ message: `CGPA must be a number between 0 and 10 for: ${edu.instituteName}` });
        }
      }

      user.education = education.map(edu => ({
        instituteName: edu.instituteName,
        from: edu.from,
        to: edu.to,
        major: edu.major,
        CGPA: edu.CGPA,
        Remarks: edu.Remarks || "",
      }));
      Logger.info("Education data updated", { accountId, education });
    }

    await user.save();
    Logger.info("Profile and education update saved", { accountId });
    res.status(200).json({ message: "Profile updated successfully", updatedUser: user });
  } catch (error) {
    Logger.error("Server error during profile update", { accountId, error: error.message });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
