import React from "react";
import styled from "styled-components";
import Pic from "../assets/stat.png";
import { useHistory } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import * as authActions from "../store/actions/Auth";
import { useDispatch } from "react-redux";
export default function NavBar() {
	const history = useHistory();
	const dispatch = useDispatch();
	return (
		<Container>
			<div
				style={{
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginRight: "auto",
				}}
				onClick={() => history.push("/home")}
			>
				<img style={{ marginRight: 15 }} src={Pic} alt="Logo" />
				<Logo>sentinic</Logo>
			</div>
			<Text onClick={() => history.push("/sentiment")}>Try it out!</Text>
			<IconButton
				onClick={() => {
					dispatch(authActions.logOut());
				}}
			>
				<Tooltip title="Log out">
					<StyledLogoutIcon />
				</Tooltip>
			</IconButton>
		</Container>
	);
}

const StyledLogoutIcon = styled(LogoutIcon)`
	color: #fff;
	height: 1rem;
	margin-right: 2rem;
`;

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

const Text = styled.p`
	color: #fff;
	margin-right: 20px;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
`;
