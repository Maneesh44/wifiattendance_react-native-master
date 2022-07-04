import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text} from 'react-native';
//import all the components we are going to use.
import Backbutton from '../../components/Backbutton';
 
export default class Announcements extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Announcements',
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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>No details Found</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9dbdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});