const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const app = express();
const http = require("http").Server(app);
const { spawn } = require("child_process");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use(morgan("dev"));

app.get("/scrape-reviews", (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send({ message: "URL Required" });
  }
  const python = spawn("python", ["scraper.py", url]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
  });
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send({ message: "Reviews Scraped" });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on port ${PORT}`));
});
