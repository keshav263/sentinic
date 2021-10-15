import React from "react";
import { PieChart as Pie } from "react-minimal-pie-chart";

export default function PieChart({ positiveCount, negativeCount }) {
	let p = (positiveCount / (positiveCount + negativeCount)).toFixed(2);
	let n = (negativeCount / (positiveCount + negativeCount)).toFixed(2);
	// console.log(p);
	if (n * 100 === 56.99999999999999) {
		n = 57;
	} else {
		n = n * 100;
	}
	if (p * 100 === 56.99999999999999) {
		p = 57;
	} else {
		p = p * 100;
	}

	return (
		<Pie
			lineWidth={20}
			label={({ dataEntry }) => dataEntry.value}
			rounded
			labelStyle={(index) => ({
				fill: "#000",
				fontSize: "6px",
				fontFamily: "sans-serif",
			})}
			animate
			labelPosition={60}
			style={{ width: "350px", height: "300px" }}
			data={[
				{
					title: "Positive",
					value: p,
					color: "#05af71",
				},
				{
					title: "Negative",
					value: n,
					color: "#f23534",
				},
			]}
		/>
	);
}
