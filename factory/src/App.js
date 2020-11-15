import {BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Order from './components/Order';
import Login from './components/Login';
import Chocolate from './components/Chocolate';
import Recipe from './components/Recipe';
import Ingredients from './components/Ingredients';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Order/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/chocolate" component={Chocolate}/>
        <Route path="/Ingredients" component={Ingredients}/>
        <Route path="/Recipe" component={Recipe}/>
      </Switch>
    </Router>
  );
}

export default App;
