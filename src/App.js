import React, { Component } from 'react';
import Home from './components/Home/Home.js'
import {connect, Provider} from 'react-redux'

class App extends Component {
  render() {
    return (
        <Home/>
    );
  }
}

export default connect(null,{})(App);
