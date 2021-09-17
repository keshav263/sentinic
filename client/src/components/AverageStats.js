import React from "react";
import styled from "styled-components";

export default function AverageStats({ revCount, difference, sentiment }) {
	return (
		<StatContainer>
			<ReviewCount>{revCount}</ReviewCount>
			<Difference>{difference}</Difference>
			<Sentiment>{sentiment}</Sentiment>
		</StatContainer>
	);
}

const StatContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: #f7f7fa;
	height: 200px;
	padding: 25px 30px;
	box-sizing: border-box;
	text-align: center;
`;

const ReviewCount = styled.p`
	font-size: 2.2rem;
	font-weight: bold;
	margin: 0;
`;

const Difference = styled.p`
	margin: 0;
	font-size: 0.7rem;
	color: #28b285;
`;

const Sentiment = styled.p`
	margin: 0;
	color: #888;
	font-size: 0.8rem;
	font-weight: bold;
`;
