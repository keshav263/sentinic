import { Switch, Route } from "react-router";
import LandingPage from "../containers/LandingPage";
import KeywordPage from "../containers/KeywordPage";
import LoadingPage from "../containers/LoadingPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LoadingPage} />
			<Route exact path="/home" component={LandingPage} />
			<Route exact path="/keyword" component={KeywordPage} />
		</Switch>
	);
};

export default Routes;
