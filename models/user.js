const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    number: { type: String, require: true },
    date: { type: Date, default: Date.now },
    signDate: { type: Date, default: Date.now },
    otptimes: { type: Number },
    otp: { type: String },
    ordertimes: { type: Number, default: 0 },
    workingtimes: { type: Number, default: 1 },
    pages: { type: [String], default: [] },
    jwt: { type: String },
    amount: { type: Number, default: 5000 },
    roles: { type: [String], default: ["customer"] },
    mail: { type: String },
    promoCode: { type: String },
    invitedBy: { type: String },
    invitations: { type: Number, default: 0 },
    activeInvitation: { type: Number, default: 0 },
    qr: { type: Boolean, default: false },
    addresses: [
      {
        content: { type: String },
        long: { type: Number },
        lat: { type: Number }
      }
    ],
    birth: { type: Date },
    messages: [
      {
        date: Date,
        content: String
      }
    ]
  },
  { collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
