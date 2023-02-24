const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

const session = require("express-session");
const mongoose = require("mongoose");
const csrf = require("csurf");
const DB_URI = "mongodb://127.0.0.1:27017/udemyNodejs";
app.use(express.json());

const db = mongoose.connect(DB_URI);
const csrfProtection = csrf();

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: DB_URI,
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

app.use(csrfProtection); // ! not a scaleable way
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const loginRoute = require("./routes/login");

app.use("/admin", adminRoute);
app.use("/shop", shopRoute);
app.use("/auth", loginRoute);

app.use("/", (req, res, next) => {
  res.status(200).send("<h1>HOME PAGE</h1>");
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
