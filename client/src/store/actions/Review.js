import { url } from "../../constants/url";
export const GET_SENTIMENT = "GET_SENTIMENT";

export const getReviewsForKeyword = (amazonUrl, keyword) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}/scrape-reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: amazonUrl,
				}),
			});
			const responseJson = await response.json();
			console.log(responseJson);
			dispatch({
				type: GET_SENTIMENT,
				payload: { data: responseJson.data, keyword },
			});
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};

export const getSentiment = (text) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}/get-sentiment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text,
				}),
			});
			const responseJson = await response.json();
			console.log(responseJson);
			return responseJson;
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};
