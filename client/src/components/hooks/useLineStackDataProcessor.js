export default function lineStackProcessor() {
	const getLineStackProcessedData = (data, algo) => {
		let dates = [];
		let positive = 0;
		let negative = 0;
		// eslint-disable-next-line array-callback-return
		data[0].data.map((d) => {
			let date = d.date;
			const month = new Date(date).getMonth();
			let bool = dates.findIndex((da) => da.month === MonthRaw[month]);
			if (bool === -1) {
				if (algo === "Logi") {
					if (d.logistic_sentiment === "0") {
						dates.push({
							month: MonthRaw[month],
							positive: 0,
							negative: 1,
						});
						negative += 1;
					} else {
						dates.push({
							month: MonthRaw[month],
							positive: 1,
							negative: 0,
						});
						positive += 1;
					}
				} else if (algo === "SVM") {
					if (d.support_vector_sentiment === "0") {
						dates.push({
							month: MonthRaw[month],
							positive: 0,
							negative: 1,
						});
						negative += 1;
					} else {
						dates.push({
							month: MonthRaw[month],
							positive: 1,
							negative: 0,
						});
						positive += 1;
					}
				} else {
					if (d.random_forest_sentiment === "0") {
						dates.push({
							month: MonthRaw[month],
							positive: 0,
							negative: 1,
						});
						negative += 1;
					} else {
						dates.push({
							month: MonthRaw[month],
							positive: 1,
							negative: 0,
						});
						positive += 1;
					}
				}
			} else {
				if (algo === "Logi") {
					if (d.logistic_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
				} else if (algo === "SVM") {
					if (d.support_vector_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
				} else {
					if (d.random_forest_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
				}
			}
		});
		dates.sort(function (a, b) {
			return MonthRaw.indexOf(a.month) - MonthRaw.indexOf(b.month);
		});

		let arr = [["Month", "Positive", "Negative"]];
		// eslint-disable-next-line array-callback-return
		dates.map((d) => {
			arr.push([d.month, d.positive, d.negative]);
		});

		let lines = [
			["Month", "Postive", "Negative"],
			// ["0", 0, 0],
		];
		// eslint-disable-next-line array-callback-return
		dates.map((s) => {
			lines.push([
				s.month,
				(s.positive / (s.positive + s.negative)) * 100,
				(s.negative / (s.positive + s.negative)) * 100,
			]);
		});

		return {
			positive,
			negative,
			stack: arr,
			lines,
		};
	};

	return [getLineStackProcessedData];

	// eslint-disable-next-line array-callback-return
}

const MonthRaw = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
