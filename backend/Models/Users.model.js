
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

  email: { type: String },
  password: { type: String },

  profile: {
    first_name: { type: String },
    last_name: { type: String },
    DOB: { type: String },
    status: { type: String }
  }

});

export default mongoose.model("Users", UserSchema);
