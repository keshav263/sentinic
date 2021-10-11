import React from "react";
import styled from "styled-components";
import PositiveIcon from "./PositiveIcon";
import RedIcon from "./RedIcon";

export default function SentimentHighlight({ review, difference, date }) {
	return (
		<Container>
			<div
				style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
			>
				{difference === "+1" ? <PositiveIcon /> : <RedIcon />}
				{/* <Difference
					style={{ color: difference === "+1" ? "#19b682" : "#f33534" }}
				>
					{difference}
				</Difference> */}
			</div>
			<div>
				<Sentiment>Sentiment {difference === "+1" ? "gain" : "loss"}</Sentiment>
				<Text>{review}</Text>
			</div>
			<DateText>{new Date(date).toLocaleDateString()}</DateText>
		</Container>
	);
}

// const Difference = styled.p`
// 	font-weight: 600;
// 	padding-left: 5px;
// `;

const Container = styled.div`
	background-color: #f7f7fa;
	border-radius: 6px;
	overflow: hidden;
	width: 40vw;
	padding: 10px;
	height: 6vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	:nth-child(odd) {
		background-color: #fff;
	}
`;

const Sentiment = styled.p`
	color: #9c9faa;
	margin: 0;
	width: 20vw;
`;

const Text = styled.p`
	text-align: left;
	margin: 10px;
	margin-left: 0;
	font-weight: 500;
	width: 20vw;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const DateText = styled.p`
	color: #868996;
	font-size: 0.7rem;
`;
