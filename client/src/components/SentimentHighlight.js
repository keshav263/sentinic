import React from "react";
import styled from "styled-components";

export default function SentimentHighlight() {
	return (
		<Container>
			<Difference>+1</Difference>
			<div>
				<Sentiment>Sentiment gain</Sentiment>
				<Text> Lorem ipsum dolor sit amet, consectetur</Text>
			</div>
			<Date>17 Mar 2020</Date>
		</Container>
	);
}

const Difference = styled.p`
	color: #19b682;
	font-weight: 600;
`;

const Container = styled.div`
	background-color: #f7f7fa;
	border-radius: 6px;
	overflow: hidden;
	width: 40vw;
	padding: 10px;
	/* height: 6vh; */
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
`;

const Text = styled.p`
	margin: 0;
	font-weight: 500;
`;

const Date = styled.p`
	color: #868996;
	font-size: 0.7rem;
`;
