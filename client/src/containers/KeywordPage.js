import React, { useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AverageStats from "../components/AverageStats";
import NavBar from "../components/NavBar";
import SentimentHighlight from "../components/SentimentHighlight";

export default function KeywordPage(props) {
	const data = useSelector((state) =>
		state.Review.keywords.filter((key) => {
			if (key.title === props.location.state) return true;
			else return false;
		})
	);
	const [stackData, setStackData] = useState([]);
	console.log(data);
	const keyword = useRef(props.location.state);

	const [texts, setTexts] = useState([]);

	useEffect(() => {
		let sentiment = [];
		for (let index = 0; index < 7; index++) {
			console.log(data[0].data[index].logistic_sentiment);
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
		}
		setTexts(sentiment);
	}, []);

	console.log(texts);

	useEffect(() => {
		let dates = [];
		data[0].data.map((d) => {
			let date = d.date;
			const month = new Date(date).getMonth();
			let bool = dates.findIndex((da) => da.month === MonthRaw[month]);
			if (bool === -1) {
				if (d.logistic_sentiment === "0")
					dates.push({ month: MonthRaw[month], positive: 0, negative: 1 });
				else dates.push({ month: MonthRaw[month], positive: 1, negative: 0 });
			} else {
				if (d.logistic_sentiment === "0") dates[bool].negative += 1;
				else dates[bool].positive += 1;
			}
		});
		dates.sort(function (a, b) {
			return MonthRaw.indexOf(a.month) - MonthRaw.indexOf(b.month);
		});

		let arr = [["Month", "Positive", "Negative"]];
		dates.map((d) => {
			arr.push([d.month, d.positive, d.negative]);
		});
		setStackData(arr);
	}, []);

	console.log(stackData);

	const getHighlights = () => {
		return texts.map((text, index) => (
			<SentimentHighlight
				difference={text.difference}
				review={text.text}
				key={index}
				date={text.date}
			/>
		));
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

const MonthRaw = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
