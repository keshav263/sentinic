import React, { useState } from "react";
import styled from "styled-components";
import { SwipeableDrawer, TextField, Divider, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import * as reviewActions from "../store/actions/Review";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
		"& .MuiOutlinedInput-input": {
			padding: "10px",
		},
		"& .MuiAutocomplete-inputRoot[class*=MuiOutlinedInput-root]": {
			padding: 0,
		},
	},
}));
export default function AddKeyword({ setKeywords }) {
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState({});
	const classes = useStyles();
	const dispatch = useDispatch();
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
					<Title>Add keyword</Title>
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
						onChange={(event, value) => setKeyword(value)}
						renderInput={(params) => (
							<StyledTextField
								{...params}
								className={classes.margin}
								id="outlined-basic"
								variant="outlined"
							/>
						)}
					/>

					<Divider style={{ margin: "40px 30px", marginTop: "40px" }} />
					<Row>
						<StyledButton
							onClick={async () => {
								setKeywords((prevState) => prevState.concat(keyword));
								//Fetch URL from Keyword
								// dispatch(reviewActions.getReviewsForKeyword(keyword))
								setOpen(false);
							}}
							variant="contained"
						>
							Apply
						</StyledButton>
						<CancelButton onClick={() => setOpen(false)} variant="contained">
							cancel
						</CancelButton>
					</Row>
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
	{ title: "Firestick 4k" },
	{ title: "Hitachi 47A" },
	{ title: "Canon 4505" },
];
