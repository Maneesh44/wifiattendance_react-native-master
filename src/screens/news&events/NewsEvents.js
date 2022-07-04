import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text} from 'react-native';
//import all the components we are going to use.
 import Backbutton from '../../components/Backbutton';
 import Toptab from './Toptab';
export default class NewsEvents extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'News',
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
                const backPage = navigation.getParam('backPage', 'Home');
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
      <Toptab/> 
  );
}
}
