import React from "react";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReviewReducer from "./store/reducers/Review";

const rootReducer = combineReducers({
	Review: ReviewReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
