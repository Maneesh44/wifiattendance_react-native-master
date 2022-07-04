import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Image,Text} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
//import all the components we are going to use.
 
export default class Summary extends Component {
  static navigationOptions = {
    title: 'News',
    //Sets Header text of Status Bar
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
     
      <View style={styles.container}> 
      <ScrollView>
        <View style={{flexDirection:'row',justifyContent: 'space-around',top:10}}>
       <TouchableOpacity onPress={()=>navigate('NewsEvents')}>
         <View style={styles.ViewStyle}>
           <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <View style={styles.ViewStyle}>
          <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View >
        </TouchableOpacity> 
        </View>
        <View style={{flexDirection:'row',justifyContent: 'space-around',top:20}}>
       <TouchableOpacity>
         <View style={styles.ViewStyle}>
         <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View >
        </TouchableOpacity> 
        <TouchableOpacity>
          <View style={styles.ViewStyle}>
          <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View >
        </TouchableOpacity> 
        </View>
        <View style={{flexDirection:'row',justifyContent: 'space-around',top:30}}>
       <TouchableOpacity>
         <View style={styles.ViewStyle}>
         <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View >
        </TouchableOpacity> 
        <TouchableOpacity>
          <View style={styles.ViewStyle}>
          <Image source={require('../../assets/images/news.jpeg')} style={{height:100 ,width:170,}}/>
        </View >
        </TouchableOpacity> 
        </View> 
        </ScrollView>
        </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9dbdb',
  },
  ViewStyle:{
height:200,
width:170,
backgroundColor:'white',
borderRadius:20,
justifyContent:'space-around'
  },
});