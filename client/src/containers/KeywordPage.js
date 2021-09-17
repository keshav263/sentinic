import React, { useRef, useState } from "react";
import Chart from "react-google-charts";
import styled from "styled-components";
import AverageStats from "../components/AverageStats";
import NavBar from "../components/NavBar";
import SentimentHighlight from "../components/SentimentHighlight";

export default function KeywordPage(props) {
	const keyword = useRef(props.location.state);
	const [texts, setTexts] = useState([
		{ difference: "+1" },
		{ difference: "+1" },
		{ difference: "+1" },
		{ difference: "+1" },
		{ difference: "+1" },
		{ difference: "+1" },
		{ difference: "+1" },
	]);
	const getHighlights = () => {
		return texts.map((text, index) => <SentimentHighlight key={index} />);
	};
	return (
		<>
			<NavBar />{" "}
			<Container>
				<GreyTitle>
					Keyword: <span style={{ color: "#000" }}>{keyword.current}</span>
				</GreyTitle>
				<Row>
					<Column>
						<SubTitle>Keyword Image</SubTitle>
						<Row>
							<AverageStats sentiment="Good" difference="+15" revCount={132} />
							<Chart
								width={"400px"}
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
						</Row>
						<SubTitle style={{ transform: "translateY(20px)", zIndex: 1 }}>
							Sentiments Summary
						</SubTitle>
						<Chart
							width={"550px"}
							height={"250px"}
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
								chartArea: { width: "100%", height: "75%" },
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
					</Column>
					<Column>
						<SubTitle>Latest Highlights</SubTitle>
						{getHighlights()}
					</Column>
				</Row>
			</Container>
		</>
	);
}

const Container = styled.div`
	padding: 2vh 5vw;
`;

const GreyTitle = styled.h3`
	color: #8f94a3;
	font-size: 2rem;
	font-weight: 500;
`;
const SubTitle = styled.p`
	font-weight: 600;
	font-size: 1rem;
`;

const Row = styled.div`
	display: flex;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 45vw;
`;
