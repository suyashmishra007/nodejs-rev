const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const loginController = {
  getAddProduct: async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      // user is not logged in
      res.redirect("/"); // redirect to login page
    }
  },
  postLogin: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save();
      return res.redirect("/");
    }
    return res.redirect("/login");
  },
  preLogin: (req, res) => {
    const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
    res.send(`PRE-LOGIN : ${isLoggedIn}`);
  },
  postLogout: (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
  },
  postSignup: async (req, res, next) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword);
      user = new User({ email, password: hashedPassword, firstName, lastName });
      user.save();
    }
    res.send(user);
  },
};

module.exports = loginController;
