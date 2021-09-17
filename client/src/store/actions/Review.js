export const getReviewsForKeyword = (url) => {
	return async (dispatch) => {
		const response = await fetch(`${url}/scrape-reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url,
			}),
		});
		const responseJson = await response.json();
		console.log(responseJson);
	};
};
