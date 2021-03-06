import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LinearProgress from "@mui/material/LinearProgress";
import { useAnimation } from "framer-motion";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(({ theme }) => ({
	divider: {
		"& .css-5xe99f-MuiLinearProgress-bar1": {
			backgroundColor: "#027f67",
		},
		"& .css-eglki6-MuiLinearProgress-root": {
			backgroundColor: "rgb(154, 199, 192)",
		},
	},
}));

export default function LoadingPage(props) {
	const [progress, setProgress] = useState(0);
	const controls = useAnimation();
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const classes = useStyles();
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					controls.start({
						opacity: 1,

						transition: { duration: 2, damping: 700 },
					});
					return;
				}
				const diff = Math.random() * 20;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isAuth) props.history.push("/home");
		else props.history.push("/get-started");
	});

	return (
		<Container>
			<lottie-player
				src="https://assets3.lottiefiles.com/packages/lf20_MjPjfi.json"
				background="transparent"
				speed="0.5"
				style={{ width: "100px", height: "100px" }}
				loop
				autoplay
			></lottie-player>
			<Box sx={{ width: "150px" }}>
				<LinearProgress
					className={classes.divider}
					style={{ backgroundColor: "#027f67 !important", color: "#027f67" }}
					variant="determinate"
					value={progress}
				/>
			</Box>
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #d6e9e6, #f3f8f7);
`;
