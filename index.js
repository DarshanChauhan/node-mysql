const express = require("express");
const app = express();
const route = require("./routes/route");
const db = require("./models/index");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);

//PORT

app.listen(8080, "192.168.0.84", () => {
  console.log(`Server is running on port 8080 `);
});
