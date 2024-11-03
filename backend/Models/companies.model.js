
import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({

  email: { type: String, unique: true },
  password: { type: String },

  profile: {
    Name: { type: String },
    Branch: { type: String },
    phone_No: { type: String, unique: true },
    status: { type: String },
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

export default mongoose.model("companies", CompanySchema);
