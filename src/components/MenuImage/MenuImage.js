import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppImages from '../../utils/AppImages';

export default class MenuImage extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.headerButtonContainer} 
        onPress={this.props.onPress}
      >
        <Image
          style={styles.headerButtonImage}
          source={AppImages.Drawer}
        />
      </TouchableOpacity>
    );
  }
}
/* --------------- STYLESHEET --------------- */
const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 15,
    height: 15,
    margin: 6,
    margin: Platform.OS === 'ios' ? 10 : 6,
  }
});