import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import AddKeyword from "../components/AddKeyword";
import Keywords from "../components/Keywords";
import Chart from "react-google-charts";
import AverageStats from "../components/AverageStats";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { Snackbar } from "@mui/material";
import socket, { ConnectMe } from "../socketIo";
import * as reviewActions from "../store/actions/Review";
import useLineStackAverageDataProcessor from "../components/hooks/useLineStackAverageDataProcessor";
import ErrorPage from "./ErrorPage";
import { device } from "../device";

export default function LandingPage(props) {
	const key = useSelector((state) => state.Review.keywords);
	const isAuth = useSelector((state) => state.Auth.isAuth);
	const dispatch = useDispatch();
	const [stackData, setStackData] = useState([]);
	const [lineData, setLineData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [positiveCount, setPositiveCount] = useState(0);
	const [negativeCount, setNegativeCount] = useState(0);
	const [getLineStackProcessedData] = useLineStackAverageDataProcessor();
	const [openSnack, setOpenSnack] = useState(false);
	const getAllKeywords = () => {
		return key?.map((key, index) => {
			return (
				<Keywords
					key={index}
					title={key.title}
					positiveCount={key.positiveCount}
					negativeCount={key.negativeCount}
				/>
			);
		});
	};

	useEffect(() => {
		if (!isAuth) {
			props.history.push("/login");
		}
	}, [isAuth, props]);

	useEffect(() => {
		ConnectMe();
	}, []);

	const getStats = useCallback(() => {
		const { positive, negative, stack, lines } = getLineStackProcessedData(key);
		setStackData(stack);
		setLineData(lines);
		setPositiveCount(positive);
		setNegativeCount(negative);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	useEffect(() => {
		getStats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getStats]);

	useEffect(() => {
		socket.on("connect", (socket) => {
			console.log("Socket Connected");
		});
	}, []);

	useEffect(() => {
		socket.off("scraped_data").on("scraped_data", async (socket) => {
			setIsLoading(true);
			await dispatch(
				reviewActions.getReviews(
					socket.data,
					socket.keyword,
					socket.positiveCount,
					socket.negativeCount
				)
			);
			setIsLoading(false);
			// getStats();
		});
	}, [dispatch, getStats]);

	const isTablet = useMediaQuery("(max-width:768px)");
	const isLaptop = useMediaQuery("(max-width:1024px)");
	if (isTablet) {
		return <ErrorPage />;
	}

	if (isLoading)
		return (
			<Container
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<CircularProgress color="primary"></CircularProgress>
			</Container>
		);

	return (
		<>
			<NavBar />
			<Container>
				<Title>Products</Title>
				<KeywordsContainer>
					{getAllKeywords()}
					<AddKeyword setOpenSnack={setOpenSnack} />
				</KeywordsContainer>
				<Title>Average Product Image</Title>
				{key.length > 0 ? (
					<Row>
						<div style={{ display: "flex", alignItems: "center" }}>
							<AverageStats
								difference={positiveCount - negativeCount}
								revCount={positiveCount + negativeCount}
								positiveCount={positiveCount}
								negativeCount={negativeCount}
							/>
							<Chart
								width={isLaptop ? "60vw" : "35vw"}
								height={"200px"}
								style={{ marginLeft: "20px" }}
								chartType="Line"
								loader={
									<ProgressContainer
										style={{
											width: "500px",
											height: "200px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<CircularProgress />
									</ProgressContainer>
								}
								data={lineData}
								options={{
									legend: { position: "none" },
									colors: ["green", "#f23534"],
									axes: {
										y: {
											0: { side: "right" },
										},
									},
									animation: {
										startup: true,
										easing: "linear",
										duration: 1500,
									},
								}}
								chartEvents={[
									{
										eventName: "animationfinish",
										callback: () => {
											console.log("Animation Finished");
										},
									},
								]}
								rootProps={{ "data-testid": "3" }}
							/>
						</div>
						<Chart
							width={isLaptop ? "80vw" : "35vw"}
							height={"200px"}
							chartType="ColumnChart"
							loader={
								<ProgressContainer
									style={{
										width: "500px",
										height: "200px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<CircularProgress />
								</ProgressContainer>
							}
							data={stackData}
							options={{
								title: "Average sentiment across months",
								chartArea: { width: "100%" },
								isStacked: true,
								hAxis: {
									title: "Month",
									minValue: 0,
								},
								colors: ["#89d7bd", "#f23534"],
								vAxis: {
									title: "Sentiment Average",
								},
								animation: {
									startup: true,
									easing: "linear",
									duration: 1500,
								},
								legend: { position: "none" },

								series: {
									0: { targetAxisIndex: 1 },
									1: { targetAxisIndex: 1 },
								},
							}}
							chartEvents={[
								{
									eventName: "animationfinish",
									callback: () => {
										console.log("Animation Finished");
									},
								},
							]}
							// For tests
							rootProps={{ "data-testid": "3" }}
						/>
					</Row>
				) : (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "30vh",
						}}
					>
						<p>Add keyword to view average</p>
					</div>
				)}
				<Snackbar
					open={openSnack}
					autoHideDuration={6000}
					onClose={() => setOpenSnack(false)}
					message="Your product will be added soon"
				/>
			</Container>
		</>
	);
}

const ProgressContainer = styled.div`
	width: 500px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	@media ${device.laptop} {
		flex-direction: column;
		align-items: flex-start;
	}
	@media ${device.laptopL} {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

const Container = styled.div`
	padding: 2vh 5vw;
`;
const Title = styled.p`
	font-weight: 600;
	font-size: 1rem;
`;
const KeywordsContainer = styled.div`
	display: flex;
`;
