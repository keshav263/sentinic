import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import Pic from "../assets/stat.png";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/Auth";
export default function AuthPage(props) {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const signInButtonHandler = async () => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const user = result.user;
				console.log(user);
				await localStorage.setItem("_id", user.uid);
				await dispatch(
					authActions.signIn(user.uid, user.displayName, user.email)
				);
				props.history.push("/home");
			})
			.catch((error) => {
				throw new Error("Something went wrong");
			});
	};

	useEffect(() => {
		if (isAuth) {
			props.history.push("/home");
		}
	}, [isAuth, props]);

	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<LogoPic src={Pic} alt="Logo" />
				<Logo>Sentinic</Logo>
			</div>
			<Logo>Log in to the Sentinic Dashboard</Logo>
			<SubContainer>
				<lottie-player
					src="https://assets6.lottiefiles.com/packages/lf20_gysrp57x.json"
					background="transparent"
					speed="0.5"
					style={{ width: "200px", height: "200px" }}
					loop
					autoplay
				></lottie-player>
				<StyledButton
					onClick={signInButtonHandler}
					startIcon={<FcGoogle />}
					variant="outlined"
				>
					Log in with Google
				</StyledButton>
			</SubContainer>
		</Container>
	);
}

const StyledButton = styled(Button)`
	&.css-1rwt2y5-MuiButtonBase-root-MuiButton-root {
		color: #000;
		text-transform: capitalize;
		font-weight: bold;
		padding: 0.5rem 1.5rem;
		border: 1px solid #b6bac2;
	}
`;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f3f6f8;
`;

const Logo = styled.p`
	color: #000;
	margin: 0;
	font-weight: 500;
	font-size: 1.5rem;
	line-height: 4rem;
`;

const LogoPic = styled.img`
	height: 2.5rem;
`;

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	height: 50vh;
	width: 30vw;
	align-items: center;
	justify-content: space-around;
	box-shadow: 0 2px 2px 0 rgb(16 24 48 / 16%);
	border-radius: 8px;
`;
