export default function lineStackProcessor() {
	const getLineStackProcessedData = (data) => {
		let dates = [];
		let positive = 0;
		let negative = 0;
		// console.log(data);
		// eslint-disable-next-line array-callback-return
		data.map((d) => {
			// eslint-disable-next-line array-callback-return
			d?.data.map((key) => {
				let date = key.date;
				const month = new Date(date).getMonth();
				let bool = dates.findIndex((da) => da.month === MonthRaw[month]);
				if (bool === -1) {
					if (key.logistic_sentiment === "0") {
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
					if (key.random_forest_sentiment === "0") {
						negative += 1;
						dates[dates.length - 1].negative += 1;
					} else {
						dates[dates.length - 1].positive += 1;
						positive += 1;
					}
					if (key.support_vector_sentiment === "0") {
						negative += 1;
						dates[dates.length - 1].negative += 1;
					} else {
						dates[dates.length - 1].positive += 1;
						positive += 1;
					}
				} else {
					if (key.logistic_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
					if (key.support_vector_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
					if (key.random_forest_sentiment === "0") {
						negative += 1;
						dates[bool].negative += 1;
					} else {
						dates[bool].positive += 1;
						positive += 1;
					}
				}
			});
		});

		dates.sort(function (a, b) {
			return MonthRaw.indexOf(a.month) - MonthRaw.indexOf(b.month);
		});

		let arr = [["Month", "Positive", "Negative"]];
		// eslint-disable-next-line array-callback-return
		dates.map((d) => {
			arr.push([
				d.month,
				d.positive / (data.length * 3),
				d.negative / (data.length * 3),
			]);
		});

		let lines = [
			["Month", "Postive", "Negative"],
			// ["0", 0, 0],
		];
		// eslint-disable-next-line array-callback-return
		dates.map((s) => {
			lines.push([
				s.month,
				(s.positive /
					(data.length * 3) /
					(s.positive / (data.length * 3) + s.negative / (data.length * 3))) *
					100,
				(s.negative /
					(data.length * 3) /
					(s.positive / (data.length * 3) + s.negative / (data.length * 3))) *
					100,
			]);
		});
		// console.log(positive / (data.length * 3));
		// console.log(negative / (data.length * 3));
		// console.log(lines);
		// console.log(arr);
		return {
			positive: positive / (data.length * 3),
			negative: negative / (data.length * 3),
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
