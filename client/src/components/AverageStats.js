import React from "react";
import styled from "styled-components";
import PositiveIcon from "./PositiveIcon";
import RedIcon from "./RedIcon";

export default function AverageStats({ revCount, difference, sentiment }) {
	return (
		<StatContainer>
			<ReviewCount>{revCount}</ReviewCount>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{difference > 0 ? <PositiveIcon /> : <RedIcon />}
				<Difference>{difference.toFixed(2)}</Difference>
			</div>
			<Sentiment difference={difference}>{sentiment}</Sentiment>
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
	color: ${(props) => (props.difference > 0 ? "#28b285" : "#f33534")};
	padding-left: 4px;
`;

const Sentiment = styled.p`
	margin: 0;
	color: #888;
	font-size: 0.8rem;
	font-weight: bold;
`;
