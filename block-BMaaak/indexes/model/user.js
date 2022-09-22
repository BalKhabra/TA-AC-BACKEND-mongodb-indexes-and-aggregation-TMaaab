const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name: {type: String },
    username: {type: String, index: true, unique: true },
    email: {type: String, index: true, unique: true },
    address: {
      city: String,
      state: String,
      country: String,
      pin: Number,
    }
});

userSchema.index(
    {"address.state": 1, unique: true},
    {"address.country": 1}
);

module.exports = mongoose.model("User", userSchema);