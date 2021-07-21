import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portfolio from './components/Portfolio';

export default function AppRouter() {
    <Router>
      <Switch>
        <Route exact path="/" component={Portfolio} />
        <Route path="/show/:target" component={Portfolio} />
      </Switch>
    </Router>
}