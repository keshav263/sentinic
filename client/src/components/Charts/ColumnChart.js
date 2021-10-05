import React from "react";
import Chart from "react-google-charts";
import { CircularProgress } from "@mui/material";

export default function ColumnChart({ stackData }) {
	return (
		<Chart
			width={"550px"}
			height={"250px"}
			chartType="ColumnChart"
			loader={
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularProgress />
				</div>
			}
			data={stackData}
			options={{
				title: "Sentiment across months",
				chartArea: { width: "100%", height: "75%" },
				isStacked: true,
				hAxis: {
					title: "Month",
					minValue: 0,
				},
				colors: ["#89d7bd", "#9d686a"],
				vAxis: {
					title: "Sentiment count",
				},
				animation: {
					startup: true,
					easing: "linear",
					duration: 1500,
				},
				legend: { position: "none" },

				series: {
					0: { targetAxisIndex: 1 },
					1: { targetAxisIndex: 1 },
				},
			}}
			chartEvents={[
				{
					eventName: "animationfinish",
					callback: () => {
						console.log("Animation Finished");
					},
				},
			]}
			// For tests
			rootProps={{ "data-testid": "3" }}
		/>
	);
}
