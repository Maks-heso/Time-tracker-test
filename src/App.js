import './App.css';
import './pages';

import {   
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { DetailsPage, RecordsPage, TimerPage } from './pages';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/timer' component={TimerPage} />
          <Route exact path='/list' component={RecordsPage} />
          <Route exact path='/item/:id' component={DetailsPage} />
          <Route exact path='/' render={() => <Redirect to={'/timer'} />} />
        </Switch>
    </Router>
  );
}

export default App;
