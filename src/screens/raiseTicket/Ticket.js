import React, {Component } from "react";
import {
StyleSheet,
 View,Text,Dimensions,TouchableOpacity,Platform, Image,TextInput
} from 'react-native';
import {Card} from 'react-native-paper'
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-simple-toast';
const {height,width}=Dimensions.get('window')
import Backbutton from '../../components/Backbutton';
import moment from "moment";
export default class Ticket extends Component {

  constructor(props){
    super(props);
    this.state={
      isDatePickerVisible:false,
      setDatePickerVisibility:false,
      setTimePickerVisibility:false,
      setTimePickerVisibility:false,
      date:moment().format('DD/MM/YYYY'),
      Date:'',
      Value:'Leave',
      inTime:moment().format('LT'),
      outTime:moment().format('LT'), 
    }
  }
  showDatePicker = () => {
   this.setState({setDatePickerVisibility:true});
  };
   hideDatePicker = () => {
   this.setState({setDatePickerVisibility:false});
  };
  handleConfirm =date => {
    //console.warn("A date has been picked: ", date);
    this.setState({Date:moment(date).format("DD-MM-YYYY")})
   this.hideDatePicker();
  };
  handleInTimeConfirm =date =>{
    this.setState({inTime:moment(date).format("LT")})
   this.hideTimePicker();
  };
  handleOutTimeConfirm =date=>{
    this.setState({outTime:moment(date).format("LT")})
   this.hideTimePicker();
  };
  showTimePicker = () => {
    this.setState({setTimePickerVisibility:true});
   };
   showTime1Picker= () => {
    this.setState({setTime1PickerVisibility:true});
   };
   hideTimePicker = () => {
    this.setState({setTimePickerVisibility:false});
    this.setState({setTime1PickerVisibility:false});
   };
  static navigationOptions = ({ navigation }) => ({
    title: 'Ticket',
    
    headerTitleStyle: { 
      textAlign:"center", 
      //color:'red',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      headerLayoutPreset: 'center'
  },
    headerRight: (<TouchableOpacity onPress={()=> Toast.show('Something went wrong')}><Text style={{color:'red',fontSize:18,right:'10%'}}>SUBMIT</Text></TouchableOpacity>),
    headerLeft: (
        <Backbutton 
            onPress={() => {
                const backPage = navigation.getParam('backPage', 'RaiseTicket');
                navigation.navigate(backPage);
            }}
        />
        
    )
});
  render() {
    return (
      <View style={styles.container}>
        
      <Card style={styles.card1}>
      <Text style={styles.Textcard1} >PLEASE SELECT YOUR CONCERN</Text>
      <ModalDropdown style={{marginLeft:18,height:40,width:width*0.8,backgroundColor:'#d9dbdb',borderRadius:8,marginTop:20}}
      dropdownStyle={{alignSelf:'center',height:150,width:width*0.8,borderWidth:2}}
      dropdownTextStyle={{fontSize:20,fontWeight:'500'}}
      textStyle={{fontSize:17,padding:10}}
      defaultValue='Leave'
      options={['Leave', 'Attendace','Other']}
      onSelect={(index, value) => this.setState({Value:value})}
      />
      <Image source={require('../../assets/images/down.png')} style={styles.img1}/>
      </Card>
      {this.state.Value==='Leave'?
      <Card style={styles.card2}>
      <Text style={styles.Textcard1} >DATE</Text>
      <TouchableOpacity onPress={this.showDatePicker}>
      <View style={styles.datePick}>
    <Text style={styles.showDate}>{this.state.Date===''?this.state.date:this.state.Date}</Text></View></TouchableOpacity>
      
      <Image source={require('../../assets/images/calendar.png')} style={styles.calImg}/> 
      <DateTimePickerModal
              isVisible={this.state.setDatePickerVisibility}
              mode="date"
              format="MMMM YYYY"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
      </Card>:this.state.Value==='Other'?<View></View>:
      <Card style={Platform.OS==='ios'?styles.card4:[styles.card4,{height:height*0.35}]}>
      <Text style={styles.Textcard1} >DATE</Text>
      <TouchableOpacity onPress={this.showDatePicker}>
      <View style={styles.datePick}>
    <Text style={styles.showDate}>{this.state.Date===''?this.state.date:this.state.Date}</Text></View></TouchableOpacity>
      <Image source={require('../../assets/images/calendar.png')} style={styles.calImg}/> 
      <DateTimePickerModal
              isVisible={this.state.setDatePickerVisibility}
              mode="date"
              format="MMMM YYYY"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
            <Text style={styles.Textcard1} >INTIME</Text>
      <TouchableOpacity onPress={this.showTimePicker}>
      <View style={styles.datePick}>
    <Text style={styles.showDate}>{this.state.inTime}</Text></View></TouchableOpacity>
      <Image source={require('../../assets/images/time.png')} style={styles.calImg}/> 
      <DateTimePickerModal
              isVisible={this.state.setTimePickerVisibility}
              mode="time"
              onConfirm={this.handleInTimeConfirm}
              onCancel={this.hideTimePicker}
            />
      <Text style={styles.Textcard1} >OUTTIME</Text>
      <TouchableOpacity onPress={this.showTime1Picker}>
      <View style={styles.datePick}>
    <Text style={styles.showDate}>{this.state.outTime}</Text></View></TouchableOpacity>
      <Image source={require('../../assets/images/time.png')} style={styles.calImg}/>
      <DateTimePickerModal
              isVisible={this.state.setTime1PickerVisibility}
              mode="time"
              onConfirm={this.handleOutTimeConfirm}
              onCancel={this.hideTimePicker}
            /> 
      </Card>
      }
      <Card style={styles.card3}>
      <Text style={styles.Textcard1}>COMMENT</Text>
      <View style={styles.commentbox} ><TextInput placeholder="Enter your comment Here"/></View>
      </Card>
      </View>
      );
      }
      }
       
      const styles =StyleSheet.create({
      container:{
      flex:1,
      backgroundColor:'#d9dbdb'
      },
      card1:{
      height:height*0.16,
      marginTop:height*0.025,
      marginLeft:width*0.03,
      marginRight:width*0.03,
      },
      Textcard1:{
      fontSize:17,
      color:'grey',
      top:13,
      left:25
      },
      card2:{
        height:height*0.15,
        marginTop:height*0.015,
        marginLeft:width*0.03,
        marginRight:width*0.03,},

      card4:{
      height:height*0.32,
      marginTop:height*0.015,
      marginLeft:width*0.03,
      marginRight:width*0.03,
      },
      datePick:{
      backgroundColor:'#d9dbdb',
      height:height*0.050,
      width:150,
      left:23,
      top:15,
      borderRadius:10,

      },
      showDate:{
      alignSelf:'center',
      color:'grey',
      top:height*0.014
      },
      calImg:{
      height:height*0.030,
      width:width*0.055,
      borderColor:'white',
      marginLeft:width*0.038,
      marginTop:-height*0.021
      },
      card3:{
      height:height*0.25,
      marginTop:height*0.015,
      marginLeft:width*0.03,
      marginRight:width*0.03,
      },
      commentbox:{
      backgroundColor:'#d9dbdb',
      height:height*0.16,
      width:width*0.83,
      margin:20,
      
      },
      img1:
      {
      height:12,
      width:17,
      marginLeft:width*0.77,
      marginTop:-height*0.032
      },
      
      });