require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const appDataSource = require("./api/models/dataSource");
const route = require("./api/routes");
const { errorHandler } = require("./api/utils/error");

const app = express();
app.use(express.json());//미들웨어들은 함수 -> req,res가 미들웨어를 통과하면서 작동을 한다.
app.use(cors());
app.use(morgan("tiny"));
app.use(route);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;

  next(error);
});

app.use(errorHandler);

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
