import { url } from "../../constants/url";
export const GET_SENTIMENT = "GET_SENTIMENT";
export const DELETE_KEYOWRD = "DELETE_KEYWORD";
export const RENAME_KEYWORD = "RENAME_KEYWORD";

export const renameKeyword = (keyword, newKeyword) => {
	return async (dispatch) => {
		dispatch({ type: RENAME_KEYWORD, payload: { keyword, newKeyword } });
	};
};

export const removeKeyword = (keyword) => {
	return async (dispatch) => {
		dispatch({
			type: DELETE_KEYOWRD,
			payload: {
				keyword,
			},
		});
	};
};

export const getReviews = (data, keyword, positiveCount, negativeCount) => {
	return async (dispatch) => {
		dispatch({
			type: GET_SENTIMENT,
			payload: {
				data: data,
				keyword,
				positiveCount,
				negativeCount,
			},
		});
	};
};

export const getReviewsForKeyword = (amazonUrl, keyword) => {
	return async (dispatch) => {
		try {
			const _id = await localStorage.getItem("_id");
			console.log(amazonUrl, keyword, _id);
			const response = await fetch(`${url}/scrape-reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: amazonUrl,
					name: keyword,
					_id,
				}),
			});
			const responseJson = await response.json();
			console.log(responseJson);
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
