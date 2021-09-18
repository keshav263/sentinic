import React, { useState } from "react";
import styled from "styled-components";
import {
	SwipeableDrawer,
	TextField,
	Divider,
	Button,
	Autocomplete,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import * as reviewActions from "../store/actions/Review";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
	margin: {
		"& .MuiOutlinedInput-input": {
			padding: "10px",
		},
		"& .MuiAutocomplete-inputRoot[class*=MuiOutlinedInput-root]": {
			padding: 0,
		},
	},
	textField: {
		"& .MuiOutlinedInput-input": {
			padding: "10px",
		},
	},
	divider: {
		"& .css-e34q8v-MuiDivider-wrapper": {
			position: "relative",
			top: "50%",
		},
	},
}));
export default function AddKeyword({ setKeywords }) {
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState({ title: "", url: "" });
	const [isLoading, setIsLoading] = useState(false);
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			// await dispatch(reviewActions.getReviewsForKeyword(keyword.url));
			setKeywords((prevState) => prevState.concat(keyword));
			setIsLoading(false);
			setOpen(false);
		} catch (error) {
			console.log(error);
			alert("Something went wrong");
		}
	};

	return (
		<>
			<KeywordStat
				onClick={() => {
					setOpen(true);
				}}
			>
				<Text>+ Add Keyword</Text>
			</KeywordStat>
			<SwipeableDrawer
				anchor="right"
				variant="temporary"
				open={open}
				style={{}}
				onClose={(event) => {
					setOpen(false);
				}}
			>
				<Container>
					<Title>Add keyword or url</Title>
					<Divider style={{ marginTop: "10px" }} />
					<InfoText>
						<span style={{ color: "#e78e60" }}>Note!</span> Lorem ipsum dolor
						sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in
					</InfoText>
					<p style={{ fontWeight: "bold", margin: "20px 50px" }}>Keyword</p>
					<Autocomplete
						id="combo-box-demo"
						options={keywords}
						getOptionLabel={(option) => option.title}
						style={{ width: 300 }}
						onChange={(event, value) => {
							setKeyword(value);
						}}
						renderInput={(params) => (
							<StyledTextField
								{...params}
								className={classes.margin}
								id="outlined-basic"
								variant="outlined"
							/>
						)}
					/>

					<Divider
						flexItem={true}
						className={classes.divider}
						style={{ margin: "40px 30px", marginTop: "40px" }}
					>
						OR
					</Divider>

					<p style={{ fontWeight: "bold", margin: "0px 50px" }}>
						Name your product
					</p>
					<TextField
						value={keyword.title}
						onChange={(e) => setKeyword({ ...keyword, title: e.target.value })}
						style={{ width: "300px", margin: "20px 50px", padding: "5" }}
						className={classes.textField}
						variant="outlined"
					/>
					<p style={{ fontWeight: "bold", margin: "0px 50px" }}>URL</p>
					<TextField
						value={keyword.url}
						onChange={(e) => setKeyword({ ...keyword, url: e.target.value })}
						style={{ width: "300px", margin: "20px 50px", padding: "5" }}
						className={classes.textField}
						variant="outlined"
					/>
					{isLoading ? (
						<lottie-player
							src="https://assets8.lottiefiles.com/packages/lf20_pMMQPe.json"
							background="transparent"
							speed="2"
							loop
							autoplay
						></lottie-player>
					) : (
						<Row>
							<StyledButton onClick={onSubmit} variant="contained">
								Apply
							</StyledButton>
							<CancelButton onClick={() => setOpen(false)} variant="contained">
								cancel
							</CancelButton>
						</Row>
					)}
				</Container>
			</SwipeableDrawer>
		</>
	);
}

const Row = styled.div`
	display: flex;
`;

const StyledButton = styled(Button)`
	background-color: #3b5fe0 !important;
	color: #fff !important;
	width: 35%;
	margin-left: 50px !important;
	text-transform: capitalize !important;
`;
const CancelButton = styled(Button)`
	background-color: #fff !important;
	color: #3b5fe0 !important;
	box-shadow: none !important;
	width: 20%;
	margin-left: 30px !important;
	text-transform: capitalize !important;
`;

const InfoText = styled.p`
	margin: 20px 50px;
	color: #888;
	font-weight: 400;
	font-size: 0.8rem;
`;

const StyledTextField = styled(TextField)`
	margin: 0 50px !important;
`;

const Container = styled.div`
	width: 30vw;
	box-sizing: border-box;
	display: flex;
	padding: 25px 0;
	flex-direction: column;
`;

const Title = styled.p`
	font-size: 1.3rem;
	letter-spacing: 2px;
	margin: 0 50px;
`;

const KeywordStat = styled.div`
	border: 2px black dotted;
	border-radius: 10px;
	height: 180px;
	box-sizing: border-box;
	padding: 25px 25px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-right: 20px;
	&:hover {
		border: 2px #6177cc solid;
		background-color: #ebecfb;
	}
`;

const Text = styled.p`
	color: #6177cc;
	font-weight: 600;
`;

const keywords = [
	{
		title: "Fire TV Stick",
		url: "https://www.amazon.in/Fire-TV-Stick-Lite-with-Alexa-Voice-Remote-Lite/product-reviews/B07ZZW86G4/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
	},
	{
		title: "Noise Air Buds",
		url: "https://www.amazon.in/Noise-Wireless-Bluetooth-Earbuds-Playtime/product-reviews/B08H8N3RKT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
	},
	{
		title: "Noise Smartwatch",
		url: "https://www.amazon.in/Noise-Colorfit-Pro-Touch-Control/product-reviews/B07YY1BY5B/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
	},
	{
		title: "Fitbit",
		url: "https://www.amazon.in/Fitbit-FB507BKBK-Smartwatch-Tracking-Included/product-reviews/B07TWFVDWT/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews",
	},
];
