import { GET_SENTIMENT } from "../actions/Review";

const initialState = {
	keywords: [],
};

export default function ReviewReducer(state = initialState, action) {
	switch (action.type) {
		case GET_SENTIMENT: {
			const key = state.keywords.concat({
				title: action.payload.keyword,
				data: action.payload.data,
				positiveCount: action.payload.positiveCount,
				negativeCount: action.payload.negativeCount,
			});

			return {
				keywords: key,
			};
		}

		default: {
			return state;
		}
	}
}
