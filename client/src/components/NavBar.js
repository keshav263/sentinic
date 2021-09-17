import React from "react";
import styled from "styled-components";
import Pic from "../assets/stat.png";
export default function NavBar() {
	return (
		<Container>
			<img style={{ marginRight: 15 }} src={Pic} alt="Logo" />
			<Logo>sentinic</Logo>
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
`;
