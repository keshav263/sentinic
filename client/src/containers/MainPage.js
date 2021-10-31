import React from "react";
import styled from "styled-components";
import { Button, Link, Tooltip, useMediaQuery } from "@mui/material";
import Pic from "../assets/stat.png";
import Home from "../assets/home.png";
import { useSelector } from "react-redux";
import { device } from "../device";
import ErrorPage from "./ErrorPage";
export default function MainPage(props) {
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const isTablet = useMediaQuery("(max-width:768px)");
	if (isTablet) {
		return <ErrorPage />;
	}
	return (
		<Container>
			<Header>
				<img src={Pic} alt="Logo" />

				<StyledButton
					onClick={() => {
						if (isAuth) props.history.push("/home");
						else props.history.push("/login");
					}}
					variant="contained"
				>
					{isAuth ? "Go to console" : "Log In"}
				</StyledButton>
			</Header>
			<LinksContainer>
				<Tooltip title="Dummy">
					<StyledLink underline="none" href="#">
						About
					</StyledLink>
				</Tooltip>
				<span>/</span>
				<Tooltip title="Dummy">
					<StyledLink underline="none" href="#">
						Pricing
					</StyledLink>
				</Tooltip>
				<span>/</span>
				<Tooltip title="Dummy">
					<StyledLink underline="none" href="#">
						Contact
					</StyledLink>
				</Tooltip>
			</LinksContainer>
			<Tag>premium plan for success</Tag>
			<Title>
				Manage your products <span> easy</span> and <span>simple</span>
			</Title>
			<SubTitle>Monitor your brand reputation on amazon</SubTitle>
			<GetStartedButton
				variant="contained"
				onClick={() => {
					if (isAuth) props.history.push("/home");
					else props.history.push("/login");
				}}
			>
				Get Started
			</GetStartedButton>
			<HomePic alt="Home screen" src={Home}></HomePic>
		</Container>
	);
}

const HomePic = styled.img`
	width: 60vw;
	align-self: center;
	border-radius: 1rem;
	margin-top: 3rem;
`;

const GetStartedButton = styled(Button)`
	background: #027f67;
	text-transform: capitalize;
	align-self: center;
	border-radius: 0.4rem;
	&:hover {
		background: #027f67;
		opacity: 0.8;
	}
`;

const Title = styled.h1`
	color: #000;
	text-align: center;
	width: 40vw;
	margin: 0 auto 1rem;
	font-weight: 400;
	letter-spacing: 2px;
	font-size: 3rem;
	> span {
		background-clip: text;
		background: -webkit-linear-gradient(#446962, #79bda6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	@media ${device.laptop} {
		font-size: 2.5rem;
		width: 55vw;
	}
`;

const SubTitle = styled.p`
	margin: 0 auto 2rem;
	width: 30vw;
	text-align: center;
	letter-spacing: 1px;
	font-size: 1rem;
	@media ${device.laptop} {
		font-size: 0.8rem;
	}
`;

const Tag = styled.p`
	text-transform: uppercase;
	color: #79bda6;
	margin: 3rem auto 1rem;
	width: 20vw;
	text-align: center;
	@media ${device.laptop} {
		width: 30vw;
	}
`;

const LinksContainer = styled.div`
	display: flex;
	width: 16vw;
	align-items: center;
	justify-content: space-between;
	color: #000;
	box-sizing: border-box;
	margin: 0 auto;
	transform: translateY(-150%);
	@media ${device.laptop} {
		width: 24vw;
	}
`;

const StyledLink = styled(Link)`
	color: #000;
	font-size: 0.8rem;
`;

const StyledButton = styled(Button)`
	background: #027f67;
	text-transform: capitalize;
	padding: 0 0.5rem;
	font-size: 0.7rem;
	height: 2rem;
	border-radius: 0.4rem;
	&:hover {
		background: #027f67;
		opacity: 0.8;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	> img {
		height: 2.5rem;
	}
`;

const Container = styled.div`
	padding: 2rem 3rem;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	height: 100vh;
	width: 100vw;
	background: linear-gradient(to bottom right, #eef4f3 70%, #ffffff 50%);
	overflow: scroll;
`;
