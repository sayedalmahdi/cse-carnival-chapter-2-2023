import { SET_USER } from "./Constants";

export const initialState = {
	user: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload.user,
			};
		default:
			return state;
	}
};

export default reducer;
