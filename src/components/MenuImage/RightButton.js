import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image,Text} from 'react-native';
import Appimages from '../utils/AppImages';

export default class RightButton extends Component {
  render() {
    return (
      <TouchableHighlight 
        onPress={this.props.onPress} 
        style={styles.btnContainer}
      >
          <Text style={{bottom:20,color:'grey',
          padding:15,fontSize:16}}>Back</Text>
        {/*<Image 
          source={Appimages.Back_Arrow}
        style={styles.btnIcon} />*/}
      </TouchableHighlight>
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