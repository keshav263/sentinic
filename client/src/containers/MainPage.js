import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import Pic from "../assets/stat.png";

export default function MainPage() {
	return (
		<Container>
			<Header>
				<img src={Pic} alt="Logo" />
				<StyledButton variant="contained">Sign Up</StyledButton>
			</Header>
		</Container>
	);
}

const StyledButton = styled(Button)`
	background: #027f67;
	text-transform: capitalize;
	padding: 0 0.3rem;
	font-size: 0.7rem;
	height: 2rem;
	border-radius: 0.4rem;
	&:hover {
		background: #027f67;
		opacity: 0.8;
	}
`;

const Header = styled.div`
	padding: 2rem 3rem;
	display: flex;
	justify-content: space-between;
	> img {
		height: 2.5rem;
	}
`;

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	background: linear-gradient(to bottom right, #eef4f3 50%, #ffffff 50%);
`;
