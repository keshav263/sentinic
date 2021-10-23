const Queue = require("bull");
const spawn = require("await-spawn");
const { Review } = require("../models/Review");
var csv = require("csvtojson");
const scraperQueue = new Queue("Web Scraping");

scraperQueue.process(async (job, done) => {
  try {
    const { name, url } = job.data;
    const scraped = await spawn("python", ["scraper.py", url]);
    const logistic = await spawn("python", ["logistic.py"]);
    const randomForest = await spawn("python", ["rf.py"]);
    const supportVector = await spawn("python", ["svm.py"]);
    let lr = logistic.toString();
    console.log(lr);
    let rf = randomForest.toString();
    console.log(rf);
    let svm = supportVector.toString();
    console.log(svm);
    const content = await csv().fromFile("amazon_review.csv");
    console.log(content);
    const review = new Review({ name, url, content });
    await review.save();
    done(null, { status: "Reviews Scraped", lr, rf, svm, _id: review._id });
    // throw new Error("Something went wrong");
  } catch (error) {
    console.log(error);
    done(new Error("Something went wrong"));
  }
});

exports.scraperQueue = scraperQueue;
