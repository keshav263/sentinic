const Queue = require("bull");
const spawn = require("await-spawn");
const { Review } = require("../models/Review");
var csv = require("csvtojson");
const scraperQueue = new Queue("Web Scraping");

scraperQueue.process(async (job, done) => {
  try {
    const { name, url, _id } = job.data;
    const scraped = await spawn("python", ["scraper.py", url]);
    const logistic = await spawn("python", ["logistic.py"]);
    const randomForest = await spawn("python", ["rf.py"]);
    const supportVector = await spawn("python", ["svm.py"]);
    let lr = logistic.toString();

    let rf = randomForest.toString();

    let svm = supportVector.toString();

    const content = await csv().fromFile("amazon_review.csv");

    const review = new Review({ name, url, content });
    await review.save();
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
