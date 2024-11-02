
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

  email: { type: String, unique: true },
  password: { type: String },

  profile: {
    first_name: { type: String },
    last_name: { type: String },
    DOB: { type: String },
    phone_No: { type: String, unique: true },
    status: { type: String }
  }

});

export default mongoose.model("Users", UserSchema);
