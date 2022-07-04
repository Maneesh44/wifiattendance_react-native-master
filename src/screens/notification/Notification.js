import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View,SafeAreaView, Text,FlatList,Image,Dimensions} from 'react-native';
import { Card } from 'react-native-paper';
import AppImages from '../../utils/AppImages';
import Backbutton from '../../components/Backbutton';
import ApiConfig from '../../api/ApiConfig'
import { simpleGetCall } from '../../api/ApiServices'
import {UIActivityIndicator} from 'react-native-indicators';
import moment from 'moment';
//import all the components we are going to use.
const { width, height } = Dimensions.get('window');
import Dialog, {DialogContent} from 'react-native-popup-dialog';
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isProcessing:true,
      visible:true,
      notifi_no:0,
    }}
    componentDidMount() {
      this.getNotification();
    }
  static navigationOptions = ({ navigation }) => ({
    header:null,
});
getNotification(){
  simpleGetCall(ApiConfig.NOTIFICATION)
  .then((data) =>{
    this.parseData(data);
  }).catch((error) => {
    console.log("getAllCards api response", error);
  });
  }
  parseData(data){
    let temp=[];
    if(data.ListNotificationPublish.length>0){
    temp =data.ListNotificationPublish.map(item=>({
      NotificationId:item.NotificationId,
      Message:item.Message,
      Date:item.Date,
      NotificationHeader:item.NotificationHeader,
      NotificationType:item.NotificationType,
      ReadStatus:item.ReadStatus,
      ImageUri:item.ImageUri
    }))
    this.setState({data:temp,isProcessing:false,visible:false,notifi_no:data.ListNotificationPublish.length})
  }else{
    this.setState({data:temp,isProcessing:false,visible:false})
  }
}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignSelf:'center',flexDirection:'row'}}>
          <Text style={{fontSize:22,fontWeight:'300',left:20}}>Notification</Text>
          <View style={{left:width*0.29,top:5}}>
          <Image style={{height:25,width:20}}
          source={require('../../assets/images/notification.png')}/></View>
          <View style={{backgroundColor:'skyblue',height:15,width:15,borderRadius:7,left:width*0.26}}>
    <Text style={{alignSelf:'center',top:-4}}>{this.state.notifi_no}</Text>
          </View>
          </View>
        <View style={{left:-width*0.4,top:-height*0.04}}>
      <Backbutton 
          onPress={() => {
              this.props.navigation.navigate('Home');
          }}
          />       
</View>
<View>
<Text style={{alignSelf:"center",top:-height*0.045,color:'grey'}} numberOfLines={1}>     
 ______________________________________________________________
</Text>
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
<View style={{top:-35}}>
       <FlatList 
          data={this.state.data}
          renderItem={({ item }) => (
           <View style={styles.cardstyle}>
          <Image source={AppImages.punched_icon} style={styles.img}></Image>
          <View style={styles.textView}>
          <Text style={styles.textarr}>{moment(item.Date).format('LLL')}</Text>
          <Text style={styles.textarr}>{item.Message}</Text>
          </View>
          </View>
          )}/>
          </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#DDD9E2',
  
  },
  backtext:{
    fontSize:18,
    marginTop:50,
    marginLeft:15,
    position:'absolute',
    color:'gray',
    },
    notificationText:{
    fontSize:25,
    marginTop:35,
    marginLeft:140
    },
    img:{
    height:30,
    width:27,
    top:28,
    left:10
    },
    cardstyle:{
      marginTop:18,
      height:80,
      width:width*0.93,
      flexDirection:'row',
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:5,
    
    },
    textarr:{
    fontSize:17,
    textAlign:'left',
    padding:2,
   top:3

    },
    textView:{
  left:18,
  width:width*0.8
    }
    
})