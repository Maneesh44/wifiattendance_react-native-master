import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text,TouchableOpacity,Image,Dimensions} from 'react-native';
//import all the components we are going to use.
import Backbutton from '../../components/Backbutton';
import AppImages from '../../utils/AppImages';
 const{height,width}=Dimensions.get('window')
export default class MyAccountScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Account',
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

    return (
      <View style={styles.container}>
    <TouchableOpacity
    onPress={() => {
        this.props.navigation.navigate('Profile');
      }} >
   <View style={styles.view1} >
   <Image source={AppImages.Profile1} style={styles.img} ></Image>
   <Text style={styles.text}>Profile</Text>
   </View>
   </TouchableOpacity>

   <TouchableOpacity 
   onPress={() => {
    this.props.navigation.navigate('Deduction');
  }}>
   <View style={styles.view1} >
   <Image source={AppImages.Deductions} style={styles.img} ></Image>
   <Text style={styles.text}>Deductions</Text>
   </View>
   </TouchableOpacity>

   <TouchableOpacity 
   onPress={() => {
    this.props.navigation.navigate('Rewards');
  }}>
   <View style={styles.view1} > 
   <Image source={AppImages.Rewards} style={styles.img} ></Image>
   <Text style={styles.text}>Rewards</Text>
   </View>
   </TouchableOpacity>

   <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('Documents');
      }}>
   <View style={styles.view1} >
     <Image source={AppImages.Documents} style={styles.img} ></Image>
     <Text style={styles.text}>Documents</Text>
   </View>
   </TouchableOpacity>
   
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efefef',
    //margin:50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  view1:{
    height:90,
    width:width*0.95,
  backgroundColor:'white',
  marginTop:10,
  marginLeft:15,
     marginRight:15,
  borderRadius:5,
  },
  img:{
          height:60,
          width:60,
          position:'absolute',
          marginTop:15,
          marginLeft:15
     },
text:{
  fontSize:18,
  marginLeft:90,
  marginTop:30
      },
});