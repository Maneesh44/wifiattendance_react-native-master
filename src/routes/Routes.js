import React, { Component } from 'react';
import { Dimensions,View,Image,StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from '../screens/login/LoginScreen';
import ForgotScreen from '../screens/login/ForgotScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PunchDetailScreen from '../screens/PunchDetails/PunchDetailScreen';
import AppImages from '../utils/AppImages';
import ApplyLeaveScreen from '../screens/applyLeave/ApplyLeaveScreen';
import LeaveHistoryScreen from '../screens/leaveHistory/LeaveHistoryScreen';
import Notification from '../screens/notification/Notification';
import DrawerContainer from '../screens/drawerContainer/DrawerContainer';
import MyaccountScreen from '../screens/myaccount/MyaccountScreen';
import Deduction from '../screens/myaccount/Deductions';
import Documents from '../screens/myaccount/Documents';
import Profile from '../screens/myaccount/Profile';
import Rewards from '../screens/myaccount/Rewards';
import NewsEvents from '../screens/news&events/NewsEvents';
import Aboutus from '../screens/about_us/Aboutus';
import Rewards1 from '../screens/myaccount/Rewards1';
import Summary from '../screens/PunchDetails/Summary';
import Announcements from '../screens/announcements/Announcements';
import RaiseTicket from '../screens/raiseTicket/RaiseTicket';
import Ticket from '../screens/raiseTicket/Ticket';

const { width, height } = Dimensions.get('window');
import AuthLoadingScreen from './AuthLoadingScreen';

const AuthStack = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Forgot: {
      screen: ForgotScreen,
      navigationOptions: {
        //header: null,
      },
    },
    
    
  
  
  });
  const Subdrawer = createStackNavigator({
    Myaccount:MyaccountScreen,
    Profile:Profile,
    Notification:Notification,
    About_us:Aboutus,
    NewsEvents:NewsEvents,
    Deduction:Deduction,
    Rewards:Rewards,
    Documents:Documents,
    Rewards1:Rewards1,
    Summary:Summary,
    Announcements:Announcements,
    RaiseTicket:RaiseTicket,
    Ticket:Ticket

   
      },
  
    {headerLayoutPreset: 'center'}
  );
  const HomeNavigator = createStackNavigator({

    Home:HomeScreen,
      },
      {headerLayoutPreset: 'center'}
  );

  
  const PunchStack = createStackNavigator({
    
    Punch:PunchDetailScreen,
  },
  {headerLayoutPreset: 'center'}
  );
  const LeaveStack = createStackNavigator({
    
    Leave:LeaveHistoryScreen,
  },
  {headerLayoutPreset: 'center'
  });
  const ApplyStack = createStackNavigator({
    
    Apply:ApplyLeaveScreen,
  },
  {headerLayoutPreset: 'center'
  });
  
  const TabStack = createBottomTabNavigator(
    {
     Hometab:{screen: HomeNavigator,
     navigationOptions:{
      title:'Home' 
     },},
     Punch:{screen: PunchStack,
      navigationOptions:{
        title:'Punch Details' ,
        headerTitleStyle: { 
          textAlign:"center", 
          color:'red',
          //justifyContent:'center',
          alignItems:'center',
          //alignContent:'center',
          headerLayoutPreset: 'center'
      },
       },},
     ApplyLeave:{screen:ApplyStack,
      navigationOptions:{
        title:'Apply Leave' 
       },},
     LeaveHistory:{screen:LeaveStack,
      navigationOptions:{
        title:'Leave History' 
       },},
    },
    {
      
      defaultNavigationOptions: ({ navigation }) => ({
        //title:'Home',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'Hometab') {
            return (
              <Image
                source={
                  focused
                    ? AppImages.HomeTab
                    : AppImages.HomeTab1
                }
                style={styles.icon}
              />
            );
          } else if (routeName === 'Punch') {
            return (
              <Image
                source={
                  focused
                    ? AppImages.PunchTab
                    : AppImages.PunchTab1
                }
                style={styles.icon}
              />
            );
          }else if (routeName === 'ApplyLeave') {
            return (
              <Image
                source={
                  focused
                    ? AppImages.Apply_leave
                    : AppImages.Apply_leave1
                }
                style={styles.icon}
              />
            );
          }else if (routeName === 'LeaveHistory') {
            return (
              <Image
                source={
                  focused
                    ? AppImages.Leave_history
                    : AppImages.Leave_history1
                }
                style={styles.icon}
              />
            );
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: '#474747',
        style: { height: 68, }
      },

    }
  );
  const DrawerStack = createDrawerNavigator(
    {
      MainRoute: TabStack,
      Sdrawer:Subdrawer
      
    },
    {
      drawerPosition: 'left',
      initialRouteName: 'MainRoute',
      drawerWidth: width * 0.85,
      drawerHeight:'100%',
      contentComponent: DrawerContainer
      // contentComponent: props => <DrawerContainer {...props} />
    }
  );
  //rre
  export default AppContainer = createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: AuthLoadingScreen,
        App: DrawerStack,
        Auth: AuthStack,
        //Tab:TabStack,
        //Td:Tstack
        //Dr:DrawerNavigator
      },
      {
        initialRouteName: 'AuthLoading',
      }
    )
  );
  const styles = StyleSheet.create({
    icon: {
      width:54,
      height:54
    },
  });
  
  console.disableYellowBox = true;