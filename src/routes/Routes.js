import { Switch, Route } from "react-router";
import LandingPage from "../containers/LandingPage";
import KeywordPage from "../containers/KeywordPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/keyword" component={KeywordPage} />
		</Switch>
	);
};

export default Routes;
