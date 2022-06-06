const express = require("express");
const app = express();
const route = require("./routes/routes");

const bodyParser = require("body-parser");
const db = require("./models/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);

//PORT

app.listen(4000, () => {
  console.log(`Server is running on port 4000 `);
});
