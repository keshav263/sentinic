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
    const logistic = spawn("python", ["logistic.py"]);
    logistic.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      let lr = JSON.parse(data.toString());
      const randomForest = spawn("python", ["rf.py"]);
      randomForest.stdout.on("data", function (data) {
        let rf = JSON.parse(data.toString());
        const supportVector = spawn("python", ["svm.py"]);
        supportVector.stdout.on("data", function (data) {
          let svm = JSON.parse(data.toString());
          console.log(lr);
          console.log(rf);
          console.log(svm);
          csv()
            .fromFile("amazon_review.csv")
            .then(function (obj) {
              res.status(200).send({
                status: "Analysed successfully",
                data: obj,
                positiveCount: (lr[1] + rf[1] + svm[1]) / 3,
                negativeCount: (lr[0] + rf[0] + svm[0]) / 3,
              });
            });
        });
      });
    });
    logistic.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      if (code === 0) {
        console.log(chalk.redBright(`Code 0`));
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to sentinic service" });
});

app.post("/get-sentiment", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({ message: "URL Required" });
  }
  const sentiment = spawn("python", ["sentiment.py", text]);
  sentiment.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    let sent = JSON.parse(data.toString());
    console.log(sent);
    let st = 0;
    s = sent[0] + sent[1] + sent[2];
    if (s <= 1) st = 0;
    else st = 1;
    console.log(st);
    res.status(200).send({
      status: "Analysed successfully",
      logiSentiment: sent[0],
      rfSentiment: sent[1],
      svmSentiment: sent[2],
      sentiment: st,
    });
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on port ${PORT}`));
});
