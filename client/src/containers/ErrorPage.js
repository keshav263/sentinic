import React from "react";
import LostPic from "../assets/Lost-bro.png";
import Pic from "../assets/stat.png";
import styled from "styled-components";
export default function ErrorPage() {
	return (
		<Container>
			<img
				style={{ position: "absolute", top: 20, left: 10 }}
				src={Pic}
				alt="Logo"
			/>
			<Image src={LostPic} />
			<Title>Whoops!</Title>
			<SubTitle>
				Please login from your laptop or desktop to enjoy the extensive features
				of sentinic
			</SubTitle>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	margin: 0;
	background-color: #f5f5f5;
`;

const Image = styled.img`
	height: 30vh;
`;

const Title = styled.h1`
	font-size: 6vw;
	margin: 1rem auto;
`;
const SubTitle = styled.h5`
	font-size: 1rem;
	font-weight: 300;
	width: 60vw;
	text-align: center;
	font-size: 3vw;
`;
