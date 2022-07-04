import React, { Component } from 'react';
import { StyleSheet, View,Text,Dimensions} from 'react-native';
//import Appimages from '../utils/AppImages';
import AppStrings from '../../utils/AppStrings';
import AsyncStorage from "@react-native-community/async-storage";
const { width, height } = Dimensions.get('window');
export default class Name extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            name:''
        }
    }
    componentDidMount() {
        this.NameAsync();
      }
    
      // Fetch the token from storage then navigate to our appropriate place
      NameAsync = async () => {
          try{
            const user = await AsyncStorage.getItem(AppStrings.Name);
            this.setState({name:user})
          }catch(e){
            
          }
      };
    
    render() {
    return (
      <View style={{alignItems:'center',width:width,left:40}}>
          <Text style={this.props.style}>{this.state.name}</Text>
        </View>
    );
  }
}


/* --------------- STYLESHEET --------------- */
const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
  },
  btnIcon: {
    height: 17,
    width: 17
  }
});