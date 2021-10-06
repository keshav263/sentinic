import React from "react";
import styled from "styled-components";
import Pic from "../assets/stat.png";
import { useHistory } from "react-router";
export default function NavBar() {
	const history = useHistory();
	return (
		<Container>
			<img style={{ marginRight: 15 }} src={Pic} alt="Logo" />
			<Logo>sentinic</Logo>
			<Text onClick={() => history.push("/sentiment")}>Try it out!</Text>
		</Container>
	);
}

const Container = styled.div`
	background-color: #101937;
	height: 8vh;
	width: 100vw;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 25px;
`;

const Logo = styled.p`
	color: #fff;
	margin: 0;
	font-weight: bold;
	font-size: 1.3rem;
	margin-right: auto;
`;

const Text = styled.p`
	color: #fff;
	margin-right: 20px;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
`;
