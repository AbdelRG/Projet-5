const express = require("express");
const app = express();
app.use("/", express.static("./"));
app.get("/", (req, res) => res.redirect("/html"));
app.listen(8080);
