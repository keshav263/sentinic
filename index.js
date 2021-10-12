const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
// const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const spawn = require("await-spawn");
var csv = require("csvtojson");
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
app.use(morgan("dev"));

app.post("/scrape-reviews", async (req, res) => {
	const url = req.body.url;
	if (!url) {
		return res.status(400).send({ message: "URL Required" });
	}
	try {
		const main = await spawn("python", ["scraper.py", url]);

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
