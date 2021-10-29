import React from "react";
import { PieChart as Pie } from "react-minimal-pie-chart";

export default function PieChart({ positiveCount, negativeCount }) {
	let p = Number(
		((positiveCount / (positiveCount + negativeCount)) * 100).toFixed(2)
	);
	let n = Number(
		((negativeCount / (positiveCount + negativeCount)) * 100).toFixed(2)
	);
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
