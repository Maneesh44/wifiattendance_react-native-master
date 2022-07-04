import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text} from 'react-native';
//import all the components we are going to use.
import TopTab from '../../routes/TopTab/TopTab';
 import Backbutton from '../../components/Backbutton';
export default class Documents extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Documents',
    headerTitleStyle: { 
      textAlign:"center", 
      //color:'red',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      headerLayoutPreset: 'center'
  },
    headerRight: (<View />),
    headerLeft: (
        <Backbutton
            onPress={() => {
                const backPage = navigation.getParam('backPage', 'Myaccount');
                navigation.navigate(backPage);
            }}
        />
    )
});
constructor(props) {
  super(props);
  this.state = {
  };
}

render() {
  return (
      <TopTab/> 
  );
}
}
