import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import News from './News';
import Blogs from './Blogs';


const Toptab = createMaterialTopTabNavigator({
  News :News,
  Blogs :Blogs
  },
  
  {
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: '#a3a3a3',
        labelStyle: {
            fontSize: 14,
            fontWeight:'bold',
    },
        style: {
            backgroundColor: '#f7f7f7',
        },
         indicatorStyle: {
            backgroundColor: 'red',
         }, 
    }
    
  },

   )

  export default AppContainer = createAppContainer(Toptab);