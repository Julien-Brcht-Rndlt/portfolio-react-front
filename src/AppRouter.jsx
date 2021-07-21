import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portfolio from './components/Portfolio';

export default function AppRouter() {
    return(
        <Router>
        <Switch>
            <Route exact path="/" component={Portfolio} />
        </Switch>
        </Router>
    );
}