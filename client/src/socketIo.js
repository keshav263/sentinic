import io from "socket.io-client";
import { url } from "./constants/url";
const socket = io(`${url}`, { autoConnect: false });
const ConnectMe = async () => {
	const _id = localStorage.getItem("_id");
	socket.auth = { _id };
	if (!_id) {
		console.log("ID NOT FOUND");
		console.log(_id);
		return;
	}
	socket.connect();
};

ConnectMe();

socket.onAny((event, ...args) => {
	console.log(event, args);
});

export default socket;
