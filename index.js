const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

const session = require("express-session");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const db = mongoose.connect("mongodb://127.0.0.1:27017/udemyNodejs");

const userSchema = new Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const user = new User({ firstName: "Suyash", lastName: "Mishra" });
user.save();

app.use(express.json());
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/udemyNodejs",
  collection: "sessions",
});
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const loginRoute = require("./routes/login");

app.use("/admin", adminRoute);
app.use("/shop", shopRoute);
app.use("/login", loginRoute);

app.use("/", (req, res, next) => {
  res.status(200).send("<h1>HOME PAGE</h1>");
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
