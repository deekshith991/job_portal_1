
import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
  Aid: { type: mongoose.Types.ObjectId, ref: 'Accounts' },
  email: { type: String, required: true, unique: true },  // Added email field
  profile: {
    Name: { type: String },
    Branch: { type: String },
    phone_No: { type: String },
  },
  address: {
    building: { type: String },
    street: { type: String },
    landmark: { type: String },
    location: { type: String },
    country: { type: String },
    pincode: { type: Number }
  }
});

export default mongoose.model("Companies", CompanySchema);

