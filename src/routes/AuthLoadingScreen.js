import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AppStrings from '../utils/AppStrings';

export default class AuthLoadingScreen extends Component {

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
      try{
        const userToken = await AsyncStorage.getItem(AppStrings.token);
        this.props.navigation.navigate(userToken!==null? 'App' : 'Auth');
      }catch(e){
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}