import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,Dimensions,Image,Text,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
export default class ForgotScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
<View style={styles.profileView}>
        <Image style={styles.profileImage} source={require('../../assets/images/login_logo.png')} />
        </View>
          <TextInput
          placeholder={'Username'}
          style={styles.input}
        />
        <TouchableOpacity onPress={()=>alert('response error'+'\n'+'please try after some time..!')} activeOpacity={0.9}>
    <View style={styles.myButton}>
            <Text style={{textAlign:'center',fontSize:20,color:'white'}}>Submit</Text>
          </View>
          
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    //marginTop:hp('0.1%'),
    
   
    //marginTop:'0%'
  },
  input: {
    width: wp('75%'),
    height: hp('8%'),
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 15,
    borderRadius:26,
    backgroundColor:'white',
    textAlign:'center',fontSize:20
    //top:width*0.2
  },
  profileView: {
    width: '105%',
   // borderBottomWidth: 0.5,
    //borderBottomColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 20,
    //paddingTop: Platform.OS === 'ios' ? 80 : 35
  },
  profileImage: {
    // borderRadius: 50,
     height: 103,
     width: 142,
     //marginTop: 10
     bottom:20
   },
  
  myButton:{
    padding: 20,
    height: Platform.OS === 'ios' ? 60 : 50,
    width: 195,  //The Width must be the same as the height
    borderRadius:40, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'#f2693f',
    textAlign:'center',
    justifyContent:'center',
    top:15
    

  }
});

