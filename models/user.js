const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const user = new User({ firstName: "Suyash", lastName: "Mishra" });
user.save();
