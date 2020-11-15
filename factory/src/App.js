import {BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Homepage/>}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
