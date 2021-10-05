import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AverageStats from "../components/AverageStats";
import ColumnChart from "../components/Charts/ColumnChart";
import LineChart from "../components/Charts/LineChart";
import NavBar from "../components/NavBar";
import SentimentHighlight from "../components/SentimentHighlight";
import useSentimentHighlight from "../components/hooks/useSentimentHighlights";
import useLineStackDataProcessor from "../components/hooks/useLineStackDataProcessor";
export default function KeywordPage(props) {
	const data = useSelector((state) =>
		state.Review.keywords.filter((key) => {
			if (key.title === props.location.state) return true;
			else return false;
		})
	);
	const [stackData, setStackData] = useState([]);
	const keyword = useRef(props.location.state);

	const [texts, setTexts] = useState([]);
	const [positiveCount, setPositiveCount] = useState(0);
	const [negativeCount, setNegativeCount] = useState(0);
	const [lineData, setLineData] = useState([]);
	const [getHighlight] = useSentimentHighlight();
	const [getLineStackProcessedData] = useLineStackDataProcessor();

	useEffect(() => {
		const highlights = getHighlight(data);
		setTexts(highlights);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const { positive, negative, stack, lines } =
			getLineStackProcessedData(data);
		setPositiveCount(positive);
		setNegativeCount(negative);
		setStackData(stack);
		setLineData(lines);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showHighlights = () => {
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
			<NavBar />
			<Container>
				<GreyTitle>
					Keyword: <span style={{ color: "#000" }}>{keyword.current}</span>
				</GreyTitle>
				<Row>
					<Column>
						<SubTitle>Keyword Image</SubTitle>
						<Row>
							<AverageStats
								difference={positiveCount - negativeCount}
								revCount={positiveCount + negativeCount}
							/>
							<LineChart lineData={lineData} />
						</Row>
						<SubTitle style={{ transform: "translateY(20px)", zIndex: 1 }}>
							Sentiments Summary
						</SubTitle>
						<ColumnChart stackData={stackData} />
					</Column>
					<Column>
						<SubTitle>Latest Highlights</SubTitle>
						{showHighlights()}
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
