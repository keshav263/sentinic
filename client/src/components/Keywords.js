import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import RedIcon from "./RedIcon";
import PositiveIcon from "./PositiveIcon";

export default function Keywords({ title, positiveCount, negativeCount }) {
	const history = useHistory();
	return (
		<KeywordStat
			style={{
				backgroundColor:
					positiveCount - negativeCount > 0 ? "#ddf4eb" : "#ffe2e3",
			}}
			onClick={() => history.push({ pathname: "/keyword", state: title })}
		>
			<Keyword>{title}</Keyword>
			<ReviewCount>{positiveCount + negativeCount}</ReviewCount>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{positiveCount - negativeCount > 0 ? <PositiveIcon /> : <RedIcon />}

				<DifferenceText
					style={{
						color: positiveCount - negativeCount > 0 ? "#28b285" : "#f33534",
					}}
				>
					{(positiveCount - negativeCount).toFixed(2)}
				</DifferenceText>
			</div>
			<Sentiment>
				{positiveCount - negativeCount > 0 ? "Good" : "Bad"}
			</Sentiment>
		</KeywordStat>
	);
}

const KeywordStat = styled.div`
	border-radius: 10px;
	height: 180px;
	width: 10rem;
	box-sizing: border-box;
	padding: 25px 25px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-right: 20px;
	&:hover {
		cursor: pointer;
		opacity: 0.7;
	}
`;

const Keyword = styled.p`
	font-size: 1rem;
	font-weight: bold;
	margin: 5px;
`;

const ReviewCount = styled.p`
	font-size: 2rem;
	font-weight: bold;
	margin: 5px;
`;

const Sentiment = styled.p`
	color: #888;
	font-size: 0.8rem;
	margin: 5px;
`;

const DifferenceText = styled.p`
	color: #28b285;
	margin: 5px;
	font-weight: 0.7rem;
`;
