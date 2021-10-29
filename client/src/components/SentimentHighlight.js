import React, { useState } from "react";
import styled from "styled-components";
import PositiveIcon from "./PositiveIcon";
import RedIcon from "./RedIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	overflow: "scroll",
	height: "30vh",
	bgcolor: "background.paper",
	border: "2px solid #888",
	boxShadow: 24,
	borderRadius: 4,
	p: 4,
};
export default function SentimentHighlight({
	review,
	difference,
	date,
	title,
}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Container onClick={() => setOpen(true)}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					{difference === "+1" ? <PositiveIcon /> : <RedIcon />}
					{/* <Difference
					style={{ color: difference === "+1" ? "#19b682" : "#f33534" }}
				>
					{difference}
				</Difference> */}
				</div>
				<div>
					<Sentiment>
						Sentiment {difference === "+1" ? "gain" : "loss"}
					</Sentiment>
					<Text>{review}</Text>
				</div>
				<DateText>{new Date(date).toLocaleDateString()}</DateText>
			</Container>
			<Modal
				disableEnforceFocus
				open={open}
				sx={{ borderRadius: 20 }}
				onBackdropClick={() => setOpen(false)}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						color="#3355db"
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{title}
					</Typography>
					<Typography
						color="#111830"
						id="modal-modal-description"
						sx={{
							fontWeight: 400,
						}}
					>
						{review}
					</Typography>
				</Box>
			</Modal>
		</>
	);
}

const Container = styled.div`
	background-color: #f7f7fa;
	border-radius: 6px;
	overflow: hidden;
	width: 40vw;
	padding: 10px;
	height: 6vh;
	cursor: pointer;
	display: flex;
	justify-content: space-around;
	align-items: center;
	:nth-child(odd) {
		background-color: #fff;
	}
`;

const Sentiment = styled.p`
	color: #9c9faa;
	margin: 0;
	width: 20vw;
`;

const Text = styled.p`
	text-align: left;
	margin: 10px;
	margin-left: 0;
	font-weight: 500;
	width: 20vw;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const DateText = styled.p`
	color: #868996;
	font-size: 0.7rem;
`;
