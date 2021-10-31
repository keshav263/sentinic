import React from "react";
import Chart from "react-google-charts";
import { CircularProgress } from "@mui/material";
import { device } from "../../device";
import styled from "styled-components";

export default function ColumnChart({ stackData }) {
	return (
		<StyledChart
			chartType="ColumnChart"
			loader={
				<ProgressContainer>
					<CircularProgress />
				</ProgressContainer>
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
				colors: ["#89d7bd", "#f23534"],
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

const StyledChart = styled(Chart)`
	@media ${device.laptop} {
		width: 85vw;
	}
	@media ${device.laptopL} {
		width: 35vw;
	}
`;

const ProgressContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	@media ${device.laptop} {
		width: 85vw;
	}
	@media ${device.laptopL} {
		width: 35vw;
	}
`;
