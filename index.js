const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.json());

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use("/admin", adminRoute);
app.use("/shop", shopRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
