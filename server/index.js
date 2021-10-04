const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const { spawn } = require("child_process");
var csv = require("csvtojson");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use(morgan("dev"));

app.post("/scrape-reviews", (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send({ message: "URL Required" });
  }
  const main = spawn("python", ["scraper.py", url]);
  main.stdout.on("data", function (data) {
    const nest = spawn("python", ["logistic.py"]);
    nest.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
    });
    nest.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      if (code === 0) {
        console.log(chalk.redBright(`Code 0`));
      }
      csv()
        .fromFile("amazon_review.csv")
        .then(function (obj) {
          res.send({ status: "Analysed successfully", data: obj });
        });
    });
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to sentinic service" });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on port ${PORT}`));
});
