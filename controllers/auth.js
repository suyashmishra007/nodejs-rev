const loginController = {
  postLogin: (req, res, next) => {
    req.session.isLoggedIn = true;
    res.send("COOKIE SAVED !!");
  },
  preLogin: (req, res) => {
    console.log(req.session.isLoggedIn);
    const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
    res.send(`PRE-LOGIN : ${isLoggedIn}`);
  },
};

module.exports = loginController;
