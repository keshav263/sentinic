require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const db = require("./config/db");
const redis = require("redis");
const client = redis.createClient();
const app = express();
const http = require("http").Server(app);
const spawn = require("await-spawn");
var csv = require("csvtojson");
const { scraperQueue } = require("./queues/scraperQueue");
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
db();
app.use(morgan("dev"));

<<<<<<< HEAD
app.post("/scrape-reviews", (req, res) => {
  try {
    const { url, name } = req.body;
    if (!url || !name) {
      return res.status(400).send({ message: "URL and Name Required" });
    }
    scraperQueue.add({ name, url });
    res.status(200).send({ status: "Processing" });
  } catch (error) {
    console.log(error);
  }
});

scraperQueue.on("completed", function (job, result) {
  console.log("JOB COMPLETED");
  console.log(job.returnvalue);
});

// app.post("/scrape-reviews", (req, res) => {
// 	const url = req.body.url;
// 	if (!url) {
// 		return res.status(400).send({ message: "URL Required" });
// 	}
// 	try {
// 		const main = spawn("python", ["scraper.py", url]);
// 		main.stdout.on("data", function (data) {
// 			const logistic = spawn("python", ["logistic.py"]);
// 			logistic.stdout.on("data", function (data) {
// 				console.log("Pipe data from python script ...");
// 				let lr = JSON.parse(data.toString());
// 				const randomForest = spawn("python", ["rf.py"]);
// 				randomForest.stdout.on("data", function (data) {
// 					let rf = JSON.parse(data.toString());
// 					const supportVector = spawn("python", ["svm.py"]);
// 					supportVector.stdout.on("data", function (data) {
// 						let svm = JSON.parse(data.toString());
// 						console.log(lr);
// 						console.log(rf);
// 						console.log(svm);
// 						csv()
// 							.fromFile("amazon_review.csv")
// 							.then(function (obj) {
// 								res.status(200).send({
// 									status: "Analysed successfully",
// 									data: obj,
// 									positiveCount: (lr[1] + rf[1] + svm[1]) / 3,
// 									negativeCount: (lr[0] + rf[0] + svm[0]) / 3,
// 								});
// 							});
// 					});
// 				});
// 			});
// 			logistic.on("close", (code) => {
// 				console.log(`child process close all stdio with code ${code}`);
// 				if (code === 0) {
// 					console.log(chalk.redBright(`Code 0`));
// 				}
// 				if (code === 1) {
// 					return res
// 						.status(400)
// 						.send({ success: false, message: "URL couldn't be scraped" });
// 				}
// 			});
// 		});
// 		// main.on("close", (code) => {
// 		//   console.log(chalk.redBright("Code 0 on Scraper"));
// 		// });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).send({ Error: "Something went wrong" });
// 	}
// });
=======
app.post("/scrape-reviews", async (req, res) => {
	const url = req.body.url;
	if (!url) {
		return res.status(400).send({ message: "URL Required" });
	}
	try {
		const main = await spawn("python", ["scraper.py", url]);
		console.log(main);
		const logistic = await spawn("python", ["logistic.py"]);
		let lr = JSON.parse(logistic.toString());
		const randomForest = await spawn("python", ["rf.py"]);
		let rf = JSON.parse(randomForest.toString());
		const supportVector = await spawn("python", ["svm.py"]);
		let svm = JSON.parse(supportVector.toString());
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
	} catch (error) {
		console.log(error);
		res.status(400).send({ Error: "Something went wrong" });
	}
});
>>>>>>> e0bdae1776919a609ec98bf8616e1276a4c86999

app.get("/", (req, res) => {
  res.send({ message: "Welcome to sentinic service" });
});

app.post("/get-sentiment", async (req, res) => {
<<<<<<< HEAD
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({ message: "URL Required" });
  }
  try {
    const sentiment = await spawn("python", ["sentiment.py", text]);
    let sent = sentiment.toString();
    console.log(sent);
    let st = 0;
    // s = sent[0] + sent[1] + sent[2];
    // if (s <= 1) st = 0;
    // else st = 1;
    // console.log(st);
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
=======
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
>>>>>>> e0bdae1776919a609ec98bf8616e1276a4c86999
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on port ${PORT}`));
});

client.on("connect", function () {
  console.log(chalk.cyanBright("Redis Connected"));
});
