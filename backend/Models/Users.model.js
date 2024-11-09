
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
  education: [{
    instituteName:{type:String},
    from:{type:String},
    to:{type:String},
    major:{type:String},
    CGPA:{type:Number},
    Remarks:{type:String}
  }]
});

export default mongoose.model("Users", UserSchema);

