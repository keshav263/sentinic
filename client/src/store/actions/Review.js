import { url } from "../../constants/url";

export const getReviewsForKeyword = (amazonUrl) => {
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
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};
