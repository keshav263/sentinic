import { Switch, Route } from "react-router";
import LandingPage from "../containers/LandingPage";
import KeywordPage from "../containers/KeywordPage";
import LoadingPage from "../containers/LoadingPage";
import SentimentPage from "../containers/SentimentPage";
import AuthPage from "../containers/AuthPage";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LoadingPage} />
			<Route exact path="/login" component={AuthPage} />
			<Route exact path="/home" component={LandingPage} />
			<Route exact path="/keyword" component={KeywordPage} />
			<Route exact path="/sentiment" component={SentimentPage} />
		</Switch>
	);
};

export default Routes;
