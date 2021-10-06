import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import * as reviewActions from "../store/actions/Review";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";

export default function SentimentPage() {
	const [text, setText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [logiSentiment, setLogiSentiment] = useState(null);
	const [rfSentiment, setRfSentiment] = useState(null);
	const [svmSentiment, setSvmSentiment] = useState(null);
	const [sentiment, setSentiment] = useState(null);
	const dispatch = useDispatch();
	const onSubmit = useCallback(async () => {
		setIsLoading(true);
		const response = await dispatch(reviewActions.getSentiment(text));
		setIsLoading(false);
		setLogiSentiment(response.logiSentiment);
		setRfSentiment(response.rfSentiment);
		setSvmSentiment(response.svmSentiment);
		setSentiment(response.sentiment);
	}, [text, dispatch]);
	const handleChange = (event) => {
		setText(event.target.value);
	};
	useEffect(() => {
		const listener = (event) => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				onSubmit();
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [onSubmit]);
	return (
		<>
			<NavBar />
			<Container>
				<StyledTextField
					variant="standard"
					value={text}
					onChange={handleChange}
					placeholder="Write sentiment here..."
				/>
				<EmojisContainer>
					{(logiSentiment === 0 || logiSentiment === 1) && (
						<div>
							<Image1
								src={
									logiSentiment === 0
										? "https://img.icons8.com/color/104/000000/sad--v1.png"
										: "https://img.icons8.com/fluency/104/000000/smiling.png"
								}
								alt="Sad Emoji"
							/>
							<Image2
								src={
									svmSentiment === 0
										? "https://img.icons8.com/color/104/000000/sad--v1.png"
										: "https://img.icons8.com/fluency/104/000000/smiling.png"
								}
								alt="Happy Emoji"
							/>
							<Image3
								src={
									rfSentiment === 0
										? "https://img.icons8.com/color/104/000000/sad--v1.png"
										: "https://img.icons8.com/fluency/104/000000/smiling.png"
								}
								alt="Happy Emoji"
							/>
						</div>
					)}
					{(isLoading || sentiment === 1 || sentiment === 0) && (
						<AnimationContainer>
							<lottie-player
								src={
									isLoading
										? "https://assets7.lottiefiles.com/packages/lf20_rIH9ma.json"
										: sentiment === 1
										? "https://assets2.lottiefiles.com/packages/lf20_xlbwcmun.json"
										: "https://assets2.lottiefiles.com/packages/lf20_pojzngga.json"
								}
								background="transparent"
								speed="1"
								loop
								autoplay
							></lottie-player>
						</AnimationContainer>
					)}
				</EmojisContainer>
			</Container>
		</>
	);
}

const EmojisContainer = styled.div`
	margin-top: 40px;
	width: 40vw;
	> div {
		display: flex;
		justify-content: space-around;
	}
`;

const AnimationContainer = styled.div`
	margin-top: 20px;
	height: 128px;
`;

const Image1 = styled.img``;

const Image3 = styled(Image1)``;

const Image2 = styled.img``;

const StyledTextField = styled(TextField)`
	& .css-1x51dt5-MuiInputBase-input-MuiInput-input {
		font-size: 4rem;
		line-height: 2rem;
		width: 50vw;
		color: #588878;
		font-weight: lighter;
		margin-top: 40%;
	}
	& .css-1480iag-MuiInputBase-root-MuiInput-root:before {
		border-bottom: 1px solid #94e6ca;
	}
	& .css-1480iag-MuiInputBase-root-MuiInput-root:after {
		border-bottom: 2px solid #89d7bd;
	}
`;

const Container = styled.div`
	height: 92vh;
	width: 100vw;
	background: linear-gradient(to bottom right, #eef4f3 50%, #ffffff 50%);
	display: flex;
	flex-direction: column;
	align-items: center;
`;
