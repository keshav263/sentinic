import React from "react";
import { PieChart as Pie } from "react-minimal-pie-chart";

export default function PieChart({ positiveCount, negativeCount }) {
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
					value:
						(
							positiveCount.toFixed(2) /
							(positiveCount + negativeCount).toFixed(2)
						).toFixed(2) * 100,
					color: "#05af71",
				},
				{
					title: "Negative",
					value:
						(
							negativeCount.toFixed(2) /
							(positiveCount + negativeCount).toFixed(2)
						).toFixed(2) * 100,
					color: "#f23534",
				},
			]}
		/>
	);
}
