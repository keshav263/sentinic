require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const db = require("./config/db");
let redis;
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else {
  redis = require("redis").createClient();
}

const app = express();
const http = require("http").Server(app);
const spawn = require("await-spawn");
const cors = require("cors");
var csv = require("csvtojson");
const { scraperQueue } = require("./queues/scraperQueue");
const { Review } = require("./models/Review");

const io = require("socket.io").listen(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(cors());
db();
app.use(morgan("dev"));

app.post("/scrape-reviews", (req, res) => {
  try {
    const { url, name, _id } = req.body;
    console.log(url, name, _id);
    if (!url || !name || !_id) {
      return res
        .status(400)
        .send({ message: "Please provide all the details" });
    }
    scraperQueue.add({ name, url, _id });
    res.status(200).send({ status: "Processing" });
  } catch (error) {
    console.log(error);
  }
});

io.use(async (socket, next) => {
  const _id = socket.handshake.auth._id;
  console.log("Middleware was called!!");
  if (!_id) return next(new Error("Invalid Id"));
  socket._id = _id;
  next();
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
  scraperQueue.on("completed", async function (job, result) {
    if (socket._id === job.returnvalue.socketId) {
      console.log(socket.id);
      console.log(socket._id === job.returnvalue.socketId);
      const review = await Review.findById({ _id: job.returnvalue._id });
      let lr = JSON.parse(job.returnvalue.lr);
      let rf = JSON.parse(job.returnvalue.rf);
      let svm = JSON.parse(job.returnvalue.svm);

      io.to(socket.id).emit("scraped_data", {
        data: review.content,
        keyword: review.name,
        positiveCount: (lr[1] + svm[1] + rf[1]) / 3,
        negativeCount: (lr[0] + rf[0] + svm[0]) / 3,
      });
    }
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
  try {
    const sentiment = await spawn("python", ["sentiment.py", text]);
    let sent = JSON.parse(sentiment.toString());
    console.log(sent);
    let st = 0;
    s = sent[0] + sent[1] + sent[2];
    if (s <= 1) st = 0;
    else st = 1;
    console.log(st);
    return res.status(200).send({
      status: "Analysed successfully",
      logiSentiment: sent[0],
      rfSentiment: sent[1],
      svmSentiment: sent[2],
      sentiment: st,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(400).send({ Error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on port ${PORT}`));
});

redis.on("connect", function () {
  console.log(chalk.cyanBright("Redis Connected"));
});
