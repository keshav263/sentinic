const Queue = require("bull");
const spawn = require("await-spawn");
const { Review } = require("../models/Review");
var csv = require("csvtojson");
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const scraperQueue = new Queue("Web Scraping", REDIS_URL);

scraperQueue.process(async (job, done) => {
	try {
		//CHILD EXITED WITH CODE 1
		const { url, name, _id } = job.data;
		console.log(url, name, _id);
		if (!url || !name || !_id) {
			return done(new Error("Please provide all the details"), {
				status: "Error",
			});
		}

		console.log("Starting scraping");
		const scraped = await spawn("python", ["scraper.py", url]);
		console.log(scraped);
		console.log("Scraping completed");

		console.log("Scraped successfully");
		const logistic = await spawn("python", ["logistic.py"]);
		console.log("Running Logistic");
		const randomForest = await spawn("python", ["rf.py"]);
		console.log("Running Random Forest");

		const supportVector = await spawn("python", ["svm.py"]);
		console.log("Running Random Forest");

		let lr = logistic.toString();

		let rf = randomForest.toString();

		let svm = supportVector.toString();
		console.log("CONV");
		const content = await csv().fromFile("amazon_review.csv");

		const review = new Review({ name, url, content });
		await review.save();
		console.log("SAVED");

		done(null, {
			status: "Reviews Scraped",
			lr,
			rf,
			svm,
			_id: review._id,
			socketId: _id,
		});
		// throw new Error("Something went wrong");
	} catch (error) {
		console.log(error);
		done(new Error("Something went wrong"));
	}
});

exports.scraperQueue = scraperQueue;
