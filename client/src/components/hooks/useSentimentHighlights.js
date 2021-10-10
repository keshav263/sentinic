export default function getHighlight() {
	const getHighlight = (data, algo) => {
		let sentiment = [];
		for (let index = 0; index < 7; index++) {
			if (algo === "Logi") {
				if (data[0].data[index].logistic_sentiment === "0") {
					sentiment.push({
						difference: "-1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				} else {
					sentiment.push({
						difference: "+1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				}
			} else if (algo === "SVM") {
				if (data[0].data[index].support_vector_sentiment === "0") {
					sentiment.push({
						difference: "-1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				} else {
					sentiment.push({
						difference: "+1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				}
			} else {
				if (data[0].data[index].random_forest_sentiment === "0") {
					sentiment.push({
						difference: "-1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				} else {
					sentiment.push({
						difference: "+1",
						text: data[0].data[index].review,
						date: data[0].data[index].date,
					});
				}
			}
		}
		return sentiment;
	};
	return [getHighlight];
}
