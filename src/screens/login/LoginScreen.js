import React, { Component } from 'react';
import {TextInput, Keyboard, View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, KeyboardAvoidingView, Switch, ImageBackground, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AppImages from '../../utils/AppImages';
import ApiConfig from '../../api/ApiConfig';
import AppStrings from '../../utils/AppStrings';
import { simplePostCall } from '../../api/ApiServices';
import { ScrollView } from 'react-native-gesture-handler';
import {UIActivityIndicator} from 'react-native-indicators';
import Dialog,{DialogContent} from 'react-native-popup-dialog';
//import NetInfo from "@react-native-community/netinfo";
const { width, height } = Dimensions.get('window');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      visible:false,
      username: '',
      password: '',
      //auth_token: '',
      invalidUserName: false,
      invalidPassword: false,
      invalid: false,
      errorMessage: '',
      isChecked1: false,
      isChecked: 'false',
      showAlert: false,
      connectivity:false
    };
  }

  async componentDidMount() {
    const username = await this.getRememberedUser();
    const password = await this.getRememberedpsword();
    let isChecked;
    try {
      isChecked = await AsyncStorage.getItem(AppStrings.isChecked)
    } catch (error) { }
    if (isChecked === 'true') {
      this.setState({
        username: username || "",
        password: password || "",
        isChecked1:username && password ? true:false
      });
    }
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
      connectivity:false
    });
  };
  onLoginPress = () => {

    if (this.state.username.trim() === '') {
      this.setState({ invalidUserName: true, errorMessage: 'Required' });
      return;
    }

    if (this.state.password.trim() === '') {
      this.setState({ invalidPassword: true, errorMessage: 'Required' });
      return;
    }

    this.checkLogin();

  };

  checkLogin() {

    this.setState({ isProcessing: true ,visible:true});

    let requsetBody = JSON.stringify({
      username: this.state.username.toLowerCase(),
      password: this.state.password,
      device_type: Platform.OS.toUpperCase()
    });

    simplePostCall(ApiConfig.LOGIN, requsetBody)
      .then((data) => {

        this.setState({ isProcessing: false, visible:false,invalid: false, errorMessage: '' });

        if (data.EmployeeId) {
          this.saveUserData(data);
    
        }
        else {
          this.setState({ isProcessing: false,visible:false, invalid: true, errorMessage: "something_went_wrong",showAlert:true });
          
        }
      }).catch((error) => {
        console.log("Login api response", error);
        this.setState({ isProcessing: false, visible:false,invalid: true, errorMessage: error.message });
      });
  };

  saveUserData = async (data) => {
    console.log("Login api response", data);

    try {
      // await AsyncStorage.setItem('@storage_Key', 'stored value');
      await AsyncStorage.setItem(AppStrings.userId, data.Orgid + "");
      await AsyncStorage.setItem(AppStrings.frequency, data.Frequency ? data.Frequency : '');
      await AsyncStorage.setItem(AppStrings.latitude, data.Lat + "");
      await AsyncStorage.setItem(AppStrings.Name, data.EmployeeName);
      await AsyncStorage.setItem(AppStrings.employeeId, data.EmployeeId + "");
      await AsyncStorage.setItem(AppStrings.longitude, data.Long + "");
      await AsyncStorage.setItem(AppStrings.profileUpdated, data.ProfileUpdated + "");
      await AsyncStorage.setItem(AppStrings.token, data.access_token);
      await AsyncStorage.setItem(AppStrings.email, this.state.username);
      await AsyncStorage.setItem(AppStrings.password, this.state.password);
      //await AsyncStorage.setItem(AppStrings.isChecked, JSON.stringify(this.state.isChecked));

      this.props.navigation.navigate('App');

    } catch (e) {
      this.setState({ isProcessing: false,visible:false, invalid: true, errorMessage: 'something_went_wrong' });
    }

  };

  onBackPress = () => {
    this.props.navigation.navigate('Login');
  }
  toggleRememberMe = value => {
    this.setState({ isChecked1: value })
      if (value) {
    //user wants to be remembered.
      this.rememberUser();
    } else {
      this.forgetUser();
    }
  }
  rememberUser = async () => {
    try {
      await AsyncStorage.setItem(AppStrings.isChecked, 'true');
    } catch (error) {
      // Error saving data
    }
  };
  getRememberedUser = async () => {
    try {
      
      const username = await AsyncStorage.getItem(AppStrings.email);
      //const isChecked;
      if (username !== null) {
        // We have username!!
        return username;
      }
    
    } catch (error) {
      // Error retrieving data
    }
  };
  getRememberedpsword = async () => {
    try {
      
      const password = await AsyncStorage.getItem(AppStrings.password);
      //const isChecked;
      if (password !== null) {
        // We have username!!
        return password;
      }
    
    } catch (error) {
      // Error retrieving data
    }
  };
  forgetUser = async () => {
    try {
      
        await AsyncStorage.setItem(AppStrings.isChecked, 'false');
      await AsyncStorage.removeItem(AppStrings.Name);
      await AsyncStorage.removeItem(AppStrings.password);
      
      

    } catch (error) {
      // Error removing
      console.log(error)
    }
  };
  render() {
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        {/* <KeyboardAvoidingView > */}

        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
          <View style={{
            justifyContent: 'center', alignItems: 'center',
             flex: 1, width: width
          }}>
            <View style={styles.profileView}>
              <Image style={styles.profileImage} source={require('../../assets/images/login_logo.png')} />
            </View>
            <Text style={{ fontSize: 27, fontWeight: '100', textAlign: 'center',top:10 }}>Wi-Fi Attendance</Text>
            <View style={{
              justifyContent: 'center', alignItems: 'center',
              margin: 20,top:15
            }}>
              <TextInput

                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.username}
                onChangeText={(value) => this.setState({ username: value, invalidUserName: false, invalid: false })}
                returnKeyType='next'
                onSubmitEditing={() => { this.firstTextInput.focus(); }}
                placeholder={'Email'}
                style={styles.input}
              />
              {this.state.invalidUserName &&
                <Text
                  style={{
                    color: 'red',
                    alignSelf: "flex-end",
                    marginRight: 30,
                    marginTop: -10
                  }}>
                  {this.state.errorMessage}
                </Text>}

              <TextInput

                keyboardType='default'
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.password}
                onChangeText={(value) => this.setState({ password: value, invalidPassword: false, invalid: false })}
                placeholder={'Password'}

                style={styles.input}
              />
              {this.state.invalidPassword &&
                <Text
                  style={{
                    color: 'red',
                    alignSelf: "flex-end",
                    marginRight: 30,
                    marginTop: -10
                  }}>
                  {this.state.errorMessage}
                </Text>
              }
            </View>
            
            <View style={{ flexDirection: 'row', }}>
              <Switch
                value={this.state.isChecked1}
                onValueChange={(value) => this.toggleRememberMe(value)}
                onTintColor='#f2693f'
                thumbTintColor='white'
                style={ Platform.OS==='ios'?{transform:[{ scaleX:width*0.0022 }, { scaleY:height*0.00096}],top:-5}:{transform:[{scaleX:width*0.003 }, { scaleY:height*0.0015}]}}
              />
              <Text style={{ fontSize: 16,left:10,textAlignVertical:'center'}}>Remember me ?</Text>
              </View>
           
            <Dialog
   height={height*0.099}
   width={width*0.215}
   visible={this.state.visible}>
   <DialogContent>
 
  <View style={{top:height*0.0449}}>
       {
       this.state.isProcessing&&
 
     <UIActivityIndicator color='black' size={height*0.060}/>
 
     }</View>
         </DialogContent>
</Dialog>
              <TouchableOpacity activeOpacity={0.9} onPress={() => this.onLoginPress()}
                style={{
                  justifyContent: 'center', alignItems: 'center',
                  margin: 20
                }}
              >
                <ImageBackground source={require('../../assets/images/btn.png')}
                  style={styles.myButton}
                >
                  <Text style={{ textAlign: 'center', fontSize: 16, color: 'white', fontWeight: '700' }}>LOGIN</Text>
                </ImageBackground>
              </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>

              <Text style={{ fontSize: 16 }} >Forgot password ?</Text>
            </TouchableOpacity>

            
            </View>
            
            <Image
                style={{ width: 200, height: 20 }}
                source={AppImages.Poweredby_logo} />

            
          </View>
        
          <Dialog
   visible={this.state.showAlert}
   onTouchOutside={() => this.setState({showAlert:true})}>
   
   <DialogContent>
 <View  style={{padding:5}}>
   <View style={{width:270}}>
  <Text style={{textAlign:'center',margin:10}}>The user name or password is incorrect</Text> 
  </View>
  <TouchableOpacity onPress={this.hideAlert}>
     <View style={{alignSelf:'center',top:10,backgroundColor:'#DD6B55',
  paddingHorizontal:20,paddingVertical:10,borderRadius:10}}>
    <Text style={{fontSize:12,textAlign:'center',color:'white'}}>OK</Text>           
    </View></TouchableOpacity>   
  </View>
  </DialogContent>
</Dialog>
        </ScrollView>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',

    //marginTop:20
  },
  input: {
    width: width * 0.8,
    height: 52,
    borderWidth: 1,
    borderColor: 'grey',
    // marginBottom: 15,
    marginVertical: 10,
    // top: 50,
    borderRadius: 35,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 16,
    //top:width*0.2
  },

  myButton: {
    //padding: 15,
    height: 39,
    width: 155,  //The Width must be the same as the height

    //textAlign:'center',
    justifyContent: 'center',
    //top: 75
  },
  profileView: {
    width: '100%',
    // borderBottomWidth: 0.5,
    //borderBottomColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 20
  },
  profileImage: {
    // borderRadius: 50,
    height: 74.5,
    width: 102,
  },
  bottomView: {
    flex:0.1,
    flexDirection: 'column',
    width: '100%',
    // height: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // position: 'absolute', //Here is the 
    // bottom: 10
    bottom:0,
    
  },
});

