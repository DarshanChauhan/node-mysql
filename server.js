const express = require("express");
const app = express();
const route = require("./routes/routes");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const db = require("./models/index");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);

//PORT

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
