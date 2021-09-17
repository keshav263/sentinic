import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

export default function Keywords({ title }) {
	const history = useHistory();
	return (
		<KeywordStat
			onClick={() => history.push({ pathname: "/keyword", state: title })}
		>
			<Keyword>{title}</Keyword>
			<ReviewCount>94</ReviewCount>
			<DifferenceText>140+</DifferenceText>
			<Sentiment>Good</Sentiment>
		</KeywordStat>
	);
}

const KeywordStat = styled.div`
	background-color: #ddf4eb;
	border-radius: 10px;
	height: 180px;
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
