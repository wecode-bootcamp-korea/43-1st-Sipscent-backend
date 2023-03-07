require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const appDataSource = require("./api/models/dataSource");
const route = require("./api/routes");

app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(route);

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
