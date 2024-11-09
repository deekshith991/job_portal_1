
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  Aid: { type: mongoose.Types.ObjectId, ref: 'Accounts' },
  email: { type: String, required: true, unique: true },  // Added email field
  profile: {
    first_name: { type: String },
    last_name: { type: String },
    DOB: { type: String },
    phone_No: { type: String },
  },
  education: {
    ssc: { school: String, year: Number, GPA: Number },
    inter: { college: String, year: Number, GPA: Number },
    underGraduation: { college: String, Branch: String, year: Number, GPA: Number }
  }
});

export default mongoose.model("Users", UserSchema);

