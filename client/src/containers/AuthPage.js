import { Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import Pic from "../assets/stat.png";
import { FcGoogle } from "react-icons/fc";
import { HiUser } from "react-icons/hi";
import { signInAnonymously, signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/Auth";
export default function AuthPage(props) {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const signInGoogleHandler = async () => {
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

	const signInAnonymousHandler = async () => {
		signInAnonymously(auth)
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
			<SubContainer>
				<Title>Sentinic</Title>
				<SubTitle>Create account</SubTitle>
				<lottie-player
					src="https://assets6.lottiefiles.com/packages/lf20_gysrp57x.json"
					background="transparent"
					speed="0.5"
					style={{
						width: "200px",
						height: "200px",
						alignSelf: "center",
						margin: "2rem 0",
					}}
					loop
					autoplay
				></lottie-player>
				<StyledButton
					onClick={signInGoogleHandler}
					startIcon={<FcGoogle />}
					variant="outlined"
				>
					Log in with Google
				</StyledButton>
				<Divider
					sx={{ height: 10 }}
					orientation="horizontal"
					textAlign="center"
				>
					OR
				</Divider>
				<StyledButton
					onClick={signInAnonymousHandler}
					startIcon={<HiUser />}
					variant="outlined"
				>
					Log in anonymously
				</StyledButton>
			</SubContainer>
			<Background />
		</Container>
	);
}

const Background = styled.div`
	background-image: url("https://media.istockphoto.com/photos/analyst-working-with-business-analytics-and-data-management-system-on-picture-id1286642964?b=1&k=20&m=1286642964&s=170667a&w=0&h=doK0J0FhFqTF83bb5XggguZgbR-pF16ngrDcr7xG21o=");
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	width: 70vw;
`;

const Container = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
`;

const StyledButton = styled(Button)`
	margin: 1rem 0;
	color: #000;
	text-transform: capitalize;
	font-weight: 500;
	padding: 0.5rem 1.5rem;
	border: 1px solid #f3f6f8;
	background: #f3f6f8;
	&.css-1rwt2y5-MuiButtonBase-root-MuiButton-root {
		color: #000;
		text-transform: capitalize;
		font-weight: 500;
		padding: 0.5rem 1.5rem;
		border: 1px solid #f3f6f8;
		background: #f3f6f8;
	}
`;

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	justify-content: center;
	background-color: #fff;
	width: 30vw;
`;

const Title = styled.p`
	color: #027f67;
	margin: 0;
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 3rem;
	text-align: left;
`;

const SubTitle = styled.p`
	color: #000;
	margin: 0;
	font-weight: 500;
	font-size: 2.5rem;
	text-align: left;
`;

const LogoPic = styled.img`
	height: 2.5rem;
`;
