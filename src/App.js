import React, { Component } from 'react';
import Home from './components/Home/Home.js'
import { connect } from 'react-redux';
import { getCurrentUser } from './redux/reducers/user'
import Login from './components/Login/Login.js'

class App extends Component {
  render() {
    if (this.props.user) {
      return(
        <Home/>
        )}
        else {
          return(
            <Login/>
          )
        }
      }
    }


const mapStateToProps = state => {
  return {
      user: state.user.data
  }
}

export default connect(mapStateToProps, { getCurrentUser })(App);

