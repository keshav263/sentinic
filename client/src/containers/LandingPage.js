import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddKeyword from "../components/AddKeyword";
import Keywords from "../components/Keywords";
import Chart from "react-google-charts";
import AverageStats from "../components/AverageStats";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import useLineStackAverageDataProcessor from "../components/hooks/useLineStackAverageDataProcessor";

export default function LandingPage() {
	const key = useSelector((state) => state.Review.keywords);
	console.log(key);
	const [keywords, setKeywords] = useState(key);
	const [stackData, setStackData] = useState([]);
	const [lineData, setLineData] = useState([]);

	const [positiveCount, setPositiveCount] = useState(0);
	const [negativeCount, setNegativeCount] = useState(0);
	const [getLineStackProcessedData] = useLineStackAverageDataProcessor();
	console.log(keywords);
	const getAllKeywords = () => {
		return key?.map((key, index) => {
			return (
				<Keywords
					key={index}
					title={key.title}
					positiveCount={key.positiveCount}
					negativeCount={key.negativeCount}
				/>
			);
		});
	};

	useEffect(() => {
		const { positive, negative, stack, lines } = getLineStackProcessedData(key);
		setStackData(stack);
		setLineData(lines);
		setPositiveCount(positive);
		setNegativeCount(negative);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	return (
		<>
			<NavBar />
			<Container>
				<Title>Products</Title>
				<KeywordsContainer>
					{getAllKeywords()}
					<AddKeyword setKeywords={setKeywords} />
				</KeywordsContainer>
				<Title>Average Product Image</Title>
				{keywords.length > 0 ? (
					<Row>
						<AverageStats
							difference={positiveCount - negativeCount}
							revCount={positiveCount + negativeCount}
							positiveCount={positiveCount}
							negativeCount={negativeCount}
						/>
						<Chart
							width={"500px"}
							height={"200px"}
							style={{ marginLeft: "20px" }}
							chartType="Line"
							loader={
								<div
									style={{
										width: "500px",
										height: "200px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<CircularProgress />
								</div>
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
						<Chart
							width={"500px"}
							height={"250px"}
							chartType="ColumnChart"
							loader={
								<div
									style={{
										width: "500px",
										height: "200px",
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
								title: "Average sentiment across months",
								chartArea: { width: "70%" },
								isStacked: true,
								hAxis: {
									title: "Month",
									minValue: 0,
								},
								colors: ["#89d7bd", "#f23534"],
								vAxis: {
									title: "Sentiment Average",
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
					</Row>
				) : (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "30vh",
						}}
					>
						<p>Add keyword to view average</p>
					</div>
				)}
			</Container>
		</>
	);
}

const Row = styled.div`
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	padding: 2vh 5vw;
`;
const Title = styled.p`
	font-weight: 600;
	font-size: 1rem;
`;
const KeywordsContainer = styled.div`
	display: flex;
`;
