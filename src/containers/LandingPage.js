import React, { useState } from "react";
import styled from "styled-components";
import AddKeyword from "../components/AddKeyword";
import Keywords from "../components/Keywords";
import Chart from "react-google-charts";
import AverageStats from "../components/AverageStats";
import NavBar from "../components/NavBar";

export default function LandingPage() {
	const [keywords, setKeywords] = useState([]);
	const getAllKeywords = () => {
		return keywords.map((key, index) => {
			return <Keywords key={index} title={key.title} />;
		});
	};
	return (
		<>
			<NavBar />
			<Container>
				<Title>Keywords</Title>
				<KeywordsContainer>
					{getAllKeywords()}
					<AddKeyword setKeywords={setKeywords} />
				</KeywordsContainer>
				<Title>Average Keyword Image</Title>
				<Row>
					<AverageStats />
					<Chart
						width={"500px"}
						height={"200px"}
						style={{ marginLeft: "20px" }}
						chartType="Line"
						loader={<div>Loading Chart</div>}
						data={[
							["", ""],
							[1, 1],
							[2, 1],
							[3, 4],
							[4, 1],
							[5, 5],
							[6, 1],
							[7, 7],
							[8, 1],
							[9, 1],
							[10, 5],
							[11, 5],
							[12, 5],
							[13, 5],
							[14, 5],
						]}
						options={{
							legend: { position: "none" },
							colors: ["blue"],
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
						height={"200px"}
						chartType="ColumnChart"
						loader={<div>Loading Chart</div>}
						data={[
							["City", "2010 Population", "2000 Population"],
							["New York City, NY", 8175000, 8008000],
							["Los Angeles, CA", 3792000, 3694000],
							["Chicago, IL", 2695000, 2896000],
							["Houston, TX", 2099000, 1953000],
							["Philadelphia, PA", 1526000, 1517000],
						]}
						options={{
							title: "Population of Largest U.S. Cities",
							chartArea: { width: "70%" },
							isStacked: true,
							hAxis: {
								title: "Total Population",
								minValue: 0,
							},
							colors: ["#89d7bd", "#8f9298", "#9d686a"],
							vAxis: {
								title: "City",
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
			</Container>
		</>
	);
}

const Row = styled.div`
	display: flex;
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
