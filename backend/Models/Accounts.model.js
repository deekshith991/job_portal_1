
import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account_Type: { type: String, enum: ["user", "company"], required: true },
  status: { type: String, default: "pending", enum: ["active", "pending", "suspended"] }
});

export default mongoose.model('Accounts', accountSchema);

