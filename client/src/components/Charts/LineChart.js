import React from "react";
import Chart from "react-google-charts";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { device } from "../../device";

export default function LineChart({ lineData }) {
	return (
		<StyledChart
			style={{ marginLeft: "20px" }}
			chartType="Line"
			loader={
				<ProgressContainer
					style={{
						width: "400px",
						height: "200px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularProgress />
				</ProgressContainer>
			}
			data={lineData}
			options={{
				legend: { position: "none" },
				colors: ["green", "#f23534"],
				axes: {
					y: {
						0: { side: "right" },
					},
				},
				series: {
					0: { curveType: "function" },
					1: { curveType: "function" },
				},
				animation: {
					startup: true,
					easing: "linear",
					duration: 1500,
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
			rootProps={{ "data-testid": "3" }}
		/>
	);
}

const StyledChart = styled(Chart)`
	@media ${device.laptop} {
		width: 65vw;
	}
	@media ${device.laptopL} {
		width: 25vw;
	}
`;

const ProgressContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
