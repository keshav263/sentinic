import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import CreateIcon from "@mui/icons-material/Create";
import { IconButton, TextField } from "@mui/material";
import * as reviewActions from "../store/actions/Review";
import CheckIcon from "@mui/icons-material/Check";
export default function KeywordPage(props) {
	const data = useSelector((state) =>
		state.Review.keywords.filter((key) => {
			if (key.title === props.location.state) return true;
			else return false;
		})
	);
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const [stackData, setStackData] = useState([]);
	const keyword = useRef(props.location.state);

	const [texts, setTexts] = useState([]);
	const [positiveCount, setPositiveCount] = useState(0);
	const [negativeCount, setNegativeCount] = useState(0);
	const [lineData, setLineData] = useState([]);
	const [getHighlight] = useSentimentHighlight();
	const [getLineStackProcessedData] = useLineStackDataProcessor();
	const [algo, setAlgo] = useState("SVM");
	const [key, setKey] = useState(keyword.current);
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = (event, newValue) => {
		setAlgo(newValue);
	};

	useEffect(() => {
		if (!isAuth) {
			props.history.push("/login");
		}
	}, [isAuth, props]);

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
	console.log(texts);

	const showHighlights = () => {
		return texts.map((text, index) => (
			<SentimentHighlight
				difference={text.difference}
				review={text.text}
				title={text.title}
				key={index}
				date={text.date}
			/>
		));
	};

	return (
		<>
			<NavBar />
			<Container>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginTop: "1rem",
					}}
				>
					<GreyTitle>Product:</GreyTitle>
					<StyledTextField
						disabled={!isEditing}
						variant="filled"
						value={key}
						onChange={(event) => setKey(event.target.value)}
					></StyledTextField>
					{!isEditing ? (
						<IconButton onClick={() => setIsEditing(true)}>
							<CreateIcon style={{ fontSize: 28, color: "#6177cc" }} />
						</IconButton>
					) : (
						<IconButton
							onClick={() => {
								setIsEditing(false);
								dispatch(reviewActions.renameKeyword(keyword.current, key));
							}}
						>
							<CheckIcon style={{ fontSize: 28, color: "#6177cc" }} />
						</IconButton>
					)}
				</div>
				<StyledTabs
					style={{ justifyContent: "center", alignItems: "center" }}
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
						<SubTitle>Product Image</SubTitle>
						<Row>
							<AverageStats
								difference={positiveCount - negativeCount}
								negativeCount={negativeCount}
								positiveCount={positiveCount}
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

const StyledTextField = styled(TextField)`
	& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root {
		/* background: #f3f5f7; */
		border-bottom: 1px black solid;
		padding: 0;
		background: #fff;
		width: 16rem;
	}
	& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root.Mui-disabled {
		-webkit-text-fill-color: #000;
		opacity: 1;
		background: #fff;
		border: 0;
	}
	& .css-10botns-MuiInputBase-input-MuiFilledInput-input.Mui-disabled {
		-webkit-text-fill-color: #000;
	}
	& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before {
		border: 0;
	}
	& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
		border: 0;
	}
	&
		.css-cio0x1-MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled):before {
		border: 0;
	}
	& .css-cio0x1-muiinputbase-root-muifilledinput-root:after {
		border: 0;
	}
	& .css-10botns-MuiInputBase-input-MuiFilledInput-input {
		padding: 0;
		font-size: 2rem;
	}
	& .css-2bxn45 {
		padding: 0;
		font-size: 2rem;
		background: #fff;
		-webkit-text-fill-color: #000;
		width: 16rem;
	}
	& .css-2bxn45.Mui-disabled {
		padding: 0;
		font-size: 2rem;
		background: #fff;
		-webkit-text-fill-color: #000;
		width: 16rem;
	}
	& .css-q44vsa.Mui-disabled::before {
		border: 0;
	}
`;

const StyledTabs = styled(Tabs)`
	& .css-heg063-MuiTabs-flexContainer {
		justify-content: center;
	}
	& .css-11yukd5-MuiTabs-indicator {
		background-color: #79bda6;
	}
	& .css-1mrn996.Mui-selected {
		color: #79bda6;
	}
	& .css-axpu1l {
		background-color: #79bda6;
	}
	& .css-k008qs {
		justify-content: center;
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
	margin: 0;
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
