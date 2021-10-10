import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AverageStats from "../components/AverageStats";
import ColumnChart from "../components/Charts/ColumnChart";
import LineChart from "../components/Charts/LineChart";
import NavBar from "../components/NavBar";
import SentimentHighlight from "../components/SentimentHighlight";
import useSentimentHighlight from "../components/hooks/useSentimentHighlights";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useLineStackDataProcessor from "../components/hooks/useLineStackDataProcessor";
import PieChart from "../components/Charts/PieChart";
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
	const [algo, setAlgo] = useState("SVM");

	const handleChange = (event, newValue) => {
		setAlgo(newValue);
	};

	useEffect(() => {
		const highlights = getHighlight(data, algo);
		setTexts(highlights);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algo]);

	useEffect(() => {
		const { positive, negative, stack, lines } = getLineStackProcessedData(
			data,
			algo
		);
		setPositiveCount(positive);
		setNegativeCount(negative);
		setStackData(stack);
		setLineData(lines);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algo]);

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
				<StyledTabs
					style={{ justifyContent: "center" }}
					value={algo}
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
					aria-label="secondary tabs example"
				>
					<StyledTab value="Logi" label="Logistic Regression" />
					<StyledTab value="SVM" label="Support Vector Machine" />
					<StyledTab value="RF" label="Random Forest" />
				</StyledTabs>
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
				<GreyTitle style={{ margin: "40px 0 30px" }}>
					Sentiment Summary
				</GreyTitle>
				<PieContainer
					style={{
						height: "70vh",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<PieColumn>
						<PieChart
							positiveCount={positiveCount}
							negativeCount={negativeCount}
						/>
						<SubTitle>
							{algo === "Logi"
								? "Logistic Regression"
								: algo === "SVM"
								? "Support vector machine"
								: "Random Forest"}
						</SubTitle>
					</PieColumn>
				</PieContainer>
			</Container>
		</>
	);
}

const StyledTabs = styled(Tabs)`
	& .css-heg063-MuiTabs-flexContainer {
		justify-content: center;
	}
	& .css-11yukd5-MuiTabs-indicator {
		background-color: #79bda6;
	}
`;

const PieContainer = styled.div``;

const StyledTab = styled(Tab)`
	&.css-1a4cg4j-MuiButtonBase-root-MuiTab-root.Mui-selected {
		color: #79bda6;
	}
`;

const Container = styled.div`
	padding: 2vh 5vw;
`;

const GreyTitle = styled.h3`
	color: #8f94a3;
	font-size: 2rem;
	font-weight: 500;
	margin-bottom: 0;
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

const PieColumn = styled(Column)`
	width: auto;
	text-align: center;
`;
