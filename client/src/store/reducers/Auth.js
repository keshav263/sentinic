import { LOG_OUT, SIGN_IN } from "../actions/Auth";

const initialState = {
	_id: "",
	displayName: "",
	email: "",
	isAuth: false,
};

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_IN: {
			return {
				...state,
				_id: action.payload._id,
				email: action.payload.email,
				displayName: action.payload.displayName,
				isAuth: true,
			};
		}
		case LOG_OUT: {
			localStorage.clear();
			return initialState;
		}
		default: {
			return state;
		}
	}
}
