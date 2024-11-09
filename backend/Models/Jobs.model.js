
import mongoose from "mongoose";

const JobSchema = mongoose.Schema({

    position:{type:String},
    company:{type:String},
    branch:{type:String},
    companyId:{type:mongoose.Types.ObjectId,ref:'Companies'},
    salaryFrom:{type:Number},
    salaryUpto:{type:Number},
    qualificationNeeded:{type:String,enum:["basic","underGraduate","Graduate"]},
    vacancy :{type:Number},
    jobDescription:{type:String},
});

export default mongoose.model("jobs",JobSchema);