import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { Provider } from "react-redux";
import { Container } from 'reactstrap';
import store from "./store";
import { loadUser } from "./actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <MovieModal />
            <MovieList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
