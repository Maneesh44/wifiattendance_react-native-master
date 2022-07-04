import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/routes/Routes';

export default class App extends Component {

  componentDidMount() {
   setTimeout(() => {
     SplashScreen.hide();
    }, 1500);
  }

  render() {
    return (
      <Routes />
    );
  }

}