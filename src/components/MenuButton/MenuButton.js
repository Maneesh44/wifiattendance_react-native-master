import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';
import AppImages from '../../utils/AppImages';

const { width,height } = Dimensions.get('window');

export default class MenuButton extends Component {
  
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="rgba(128, 128, 128, 0.1)"
      >
        <View style={styles.btnContainer}>
          <Image 
            source={this.props.source} 
            style={this.props.style}
          />
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 12,
    //borderBottomWidth:0.5,
    //width:'100%',
    borderBottomColor: '#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    left:12,
    top:7
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnIcon: {
    height: 25.5,
    width: 21,
    //marginLeft: 50
  },
  btnText: {
    fontSize: 16,
    marginLeft: 30,
  }
});