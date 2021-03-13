import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import Moviesearch from './components/Moviesearch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MovieDetail from './components/MovieDetail';
import WatchList from './components/WatchList';
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={ store }>
        <Router>
          <Route>
            
          <div className="App">
              <AppNavbar />
          <Switch>
              <Route exact path='/' component={Moviesearch} />
              {/* Show Movie detail */}
              <Route path='/details' component={MovieDetail} />
              {/* Show watchlist of user */}
              <Route path='/watchlist' component={WatchList} />
          </Switch>
          </div>
          </Route>
        </Router>
      </Provider>
    );
  }
  
}

export default App;
