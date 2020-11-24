import {BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Order from './pages/Order';
import Login from './pages/Login';
import Chocolate from './pages/Chocolate';
import Recipe from './pages/Recipe';
import Ingredients from './pages/Ingredients';
import Detail from './pages/Detail';
import Shop from './pages/Shop';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component = {Order}/>
        <Route path="/login" component={Login}/>
        <Route path="/chocolate" component={Chocolate}/>
        <Route path="/shop" component={Shop}/>
        <Route exact path="/ingredients" component={Ingredients}/>
        <Route exact path="/shop/:id" render={(props) => <Detail {...props} />}/>      
        <Route path="/Recipe" component={Recipe}/>
      </Switch>
    </Router>
  );
}

export default App;
