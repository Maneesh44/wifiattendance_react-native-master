import React, { Component } from 'react';
import { Dimensions, StyleSheet,Alert, View, Image, Text, TouchableOpacity, ScrollView,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MenuButton from '../../components/MenuButton/MenuButton';
import AppImages from '../../utils/AppImages';
import AppStrings from '../../utils/AppStrings';
import Name from '../../components/MenuButton/Name';
//import { strings } from '../../i18n';

const { width, height } = Dimensions.get('window');

export default class DrawerContainer extends Component {

  constructor(props) {
    super(props);

  }
  forGet=async()=> {
    try {
     await AsyncStorage.setItem(AppStrings.token,"");

    // AsyncStorage.removeItem(userToken);
    this.props.navigation.navigate('Auth');
    } catch (e) {
    }
    }
  _twoOptionAlertHandler= ()=> {
    this.props.navigation.closeDrawer();
    //function to make two option alert
    Alert.alert(
      //title
      '',
      //body
      'Are you sure you want to logout?',
      [ 
        { text: 'Yes', onPress: this.forGet },
        {
          text: 'No',
          //onPress: () => console.log('No Pressed'),
          style: 'cancel',
           
        },
        
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };
  
  render() {

    const { navigation } = this.props;
    
    return (
      <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false} alwaysBounceVertical={true} alwaysBounceHorizontal={false}>
      
         <View style={styles.profileView}>
          <Image
            style={styles.profileImage}
            source={AppImages.SideLogo} />
        </View>
        <View style={{height:height*0.76,top:50,}}>
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',}}>
        <Name style={{color:'black',fontSize:20,alignSelf:'baseline',left:45}}/></View>
        <View style={styles.line}></View>
        
        <View style={{ width:width*0.85, justifyContent: 'center', alignItems: 'center', }}>
        <MenuButton
              title='My Account'
              style={styles.btnIcon} 
              source={AppImages.Profile}
              onPress={() => {
                navigation.navigate('Myaccount');
                navigation.closeDrawer();
              }}
            /><MenuButton
            title='Announcements'
            style={styles.btnIcon} 
            source={AppImages.Announcement}
            onPress={() => {
              navigation.navigate('Announcements');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
              title='Notification'
              style={styles.btnIcon} 
              source={AppImages.Notification}
              onPress={() => {
                navigation.navigate('Notification');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title='About Us'
              style={{width:23,height:23,}} 
              source={AppImages.About_us}
              onPress={() => {
                navigation.navigate('About_us');
                navigation.closeDrawer();
              }}
            />
            {/* <Image source={AppImages.About_us}
            style={{width:23,height:23,bottom:207,
            left:width*0.05,position:'absolute'}}/> */}
            <MenuButton
              title='Raise A Ticket'
              style={styles.btnIcon} 
              source={AppImages.RaiseTicket}
              onPress={() => {
                navigation.navigate('RaiseTicket');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title='News & Events'
              style={styles.btnIcon} 
              source={AppImages.News_events}
              onPress={() => {
                navigation.navigate('NewsEvents');
                navigation.closeDrawer();
              }}
            />
            <MenuButton
              title='Log Out'
              style={styles.btnIcon} 
              source={AppImages.Log_out}
              onPress={
                this._twoOptionAlertHandler
              //,navigation.closeDrawer()
                
              }
            />
      </View>
      
      
      </View>
      <View style={{justifyContent:"center",position:'absolute',bottom:25,left:65}}>
      <ImageBackground source={AppImages.Poweredby_logo}
       style={{width:200,height:20,}}>
         <Text style={{top:20,left:60,color:'grey'}}>Version 23</Text>
         </ImageBackground></View>
      </ScrollView>
    );
  }

}

/* ---------------  STYLESHEET --------------- */
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    bottom:10,
    backgroundColor:'red'
  },
  profileView: {
    width: '105%',
   // borderBottomWidth: 0.5,
    //borderBottomColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 73 : 33
  },
  profileImage: {
   // borderRadius: 50,
    height: 103,
    width: 133,
    marginTop: 10
  },
  line:{
   backgroundColor:'red',
   width:width*0.78,
   height:1 ,
   left:10,
   marginTop:10
  },
  icon:{
    width:40,
    height:40
  },
  btnIcon: {
    height: 25.5,
    width: 21,
    //marginLeft: 50
  },
  
});
