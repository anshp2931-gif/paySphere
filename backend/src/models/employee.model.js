const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "",
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  overtimeRate: {
    type: Number,
    default: 0,
  },
  companyName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
