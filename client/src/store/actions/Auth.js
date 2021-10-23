export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";

export const signIn = (_id, displayName, email) => {
	return async (dispatch) => {
		dispatch({
			type: SIGN_IN,
			payload: {
				_id,
				displayName,
				email,
			},
		});
	};
};

export const logOut = () => {
	return async (dispatch) => {
		dispatch({
			type: LOG_OUT,
		});
	};
};
