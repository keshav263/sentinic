import React from "react";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReviewReducer from "./store/reducers/Review";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { CircularProgress } from "@mui/material";

function App() {
	const persistConfig = {
		key: "root",
		storage: storage,
	};
	const rootReducer = combineReducers({
		Review: ReviewReducer,
	});
	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
	const persistedStore = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate
				persistor={persistedStore}
				loading={<CircularProgress color="secondary" />}
			>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
