import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Personal from '../../screens/myaccount/Personal';
import Team from '../../screens/myaccount/Team';


const TopTab = createMaterialTopTabNavigator({
  Personal :Personal,
  Team :Team
  },
  
  {
    tabBarOptions: {
        activeTintColor: '#2f88f5',
        inactiveTintColor: '#a3a3a3',
        labelStyle: {
            fontSize: 14,
            fontWeight:'bold',
    },
        style: {
            backgroundColor: '#f7f7f7',
        },
         indicatorStyle: {
            backgroundColor: '#2f88f5',
         }, 
    }
    
  },

   )

  export default AppContainer = createAppContainer(TopTab);