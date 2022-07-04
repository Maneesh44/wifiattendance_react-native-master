//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Image, SafeAreaView, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda, } from 'react-native-calendars';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';
import AppImages from '../../utils/AppImages';
import { postWithAuthCall,simpleGetCall } from '../../api/ApiServices';
import ApiConfig from '../../api/ApiConfig';
import Toast from 'react-native-simple-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import Dialog,{DialogContent} from 'react-native-popup-dialog';
import Calender from '../../calender/Calender';
const { width, height } = Dimensions.get('window');


//import { ScrollView } from 'react-native-gesture-handler';
//import all the components we are going to use.
var array = [];
var ss= [];
export default class ApplyLeaveScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: '',
      toggle: false,
      leavefrom: '',
      leaveto: '',
      reason: 'Planned Leaves',
      ishalfday: false,
      leaveid: 236,
      count: 0,
      data:{},
      data1:{},
      showAlert: false,
      visible:false,
      mrt:[]
    };
  }
  static navigationOptions = ({ navigation }) => ({
    header: null

  })
  componentDidMount(){
    this.leaveHistory()
  }

  hideAlert = () => {
    this.setState({
     
      visible:false
    });
  };
  leaveDetails = () => {
    let requsetBody = JSON.stringify({
      "LeaveList": [
        {
          "leaveFrom": array[0],
          "leaveTo": array[array.length - 1],
          "reason": this.state.reason,
          "isHalfDay": false,
          "leaveTypeId": 236
        }
      ]
    });
    if(array.length>0){
    postWithAuthCall(ApiConfig.Leave_Apply, requsetBody)
      .then((data1) => {
       // console.log(data1)
        this.setState({data1:data1,showAlert:true,visible:true})
        

      }).catch((error) => {
        console.log("leave response error", error);
      });
    }
    else{
      Toast.show('Select Date');
    }
  }
  leaveHistory = () => {
    this.setState({ isProcessing: true });
      simpleGetCall(ApiConfig.Leave_History)
      .then((data) => {
        this.setState({ isProcessing: false,});
        //console.log(data)
        this.setState({data:data })
      })
    }
  // onDayPress = (day) => {

  //   console.log(array[0] + ' ' + array[array.length - 1])
  // }

  deleteArray = () => {

    this.setState({ count: 0,toggle:false })
    array.splice(0, array.length)
    ss.splice(0, ss.length)

  }
  dtClk=(key)=>{
    console.log("ttt ",key)
  }
  getUnique(arr){

    // Loop through array values
    for(let i=0;i<arr.length;i++){
        for(let j=i+1;j<arr.length;j++){
        if(arr[i]===arr[j]){
            arr.splice(i,1);
            arr.splice(arr.length-1,1);
        }
    }
    }
    console.log('eee1 ',arr);
    return array;
}

  render() {
    const {showAlert} = this.state;
    let x = '2020-01-28';
    let data = [{
      value: 'Planned leaves',
    }, {
      value: 'Unplanned leaves',
    },];
    return (
      <View style={styles.container}>
        <View style={styles.top}></View>
        <View style={styles.header} >

          <View style={{ width: width * 0.74, top: 5 }}>
            <Text style={{ fontSize: 21, marginTop: 7, textAlign: 'center', left: 13 }}>Summary</Text>
          </View>
          <View>
            <Text style={{ textAlign: 'center', marginTop: 7, fontSize: 20, color: 'red', top: 5 }}
              onPress={this.leaveDetails}>APPLY</Text>
          </View>
        </View>
        <View style={styles.container1}>
        <Text style={{ fontSize: 20, fontWeight: '500', left: 10 }}>Leave Balance</Text>
          {this.state.data?this.state.data.LeaveTypes && this.state.data.LeaveTypes.map((item)=>(

          
          <Text style={{  fontSize: 16, left: 10,margin:5 }}>
            {item.LeaveTypeName}
    <Text style={{color:'red',fontSize:16,}}>  {item.TotalLeaveBalance}.0</Text>
          <Text style={{color:'#0f4a03',fontSize:16}}>/{item.YearlyLeaves}.0</Text>
            </Text>)):''}
        </View>

        <ScrollView
          //horizontal={false}

          automaticallyAdjustContentInsets>
          <SafeAreaView >
            <View >
              <Calender 
              dtClk={(d,month,year) =>{
               
                this.dtClk(d,month,year),
                 
                 this.setState({toggle:true,})
              }}
              _press={(k,cheked)=>{
                
                array=k
                
                ss=cheked
                
                this.setState({mrt:k})
              }}
              />
              
             </View>
            <View style={{ top: 25 }}>
              <View style={{ width: width, height: 1, backgroundColor: 'lightgrey' }} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 18, left: 10 }}>Selected Leaves</Text>
                {array.map((item, key) => (
                  <Text style={{ fontSize: 18, left: 10, color: 'blue' }} > {moment(item).format('D')} <Text>{moment(item).format('MMM')}</Text>,</Text>)
                )}</View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, lineHeight: 40, left: 10 }}>Total Selected Leaves :{array.length}</Text>
                {!this.state.toggle || array.length===0 ?
                <View style={{ backgroundColor: 'grey', right: 15, width: 68, height: 23, borderRadius: 10, top: 5, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, textAlign: 'center', color: 'white' }}
                    onPress={this.deleteArray}>CLEAR</Text>
                </View>:
                <View style={{ backgroundColor: 'red', right: 15, width: 68, height: 23, borderRadius: 10, top: 5, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, textAlign: 'center', color: 'white' }}
                    onPress={this.deleteArray}>CLEAR</Text>
              </View>}
              </View>
              <View style={{ width: width, height: 1, backgroundColor: 'lightgrey' }} />
              <View style={{ height: 20, }} />
              <View>
                <Text style={{ fontSize: 18, left: 30, margin: 5 }}>Leave Type</Text>

                <ModalDropdown options={['Planned Leave', 'Unplaned Leave']}
                  style={{
                    width: width * 0.85, height: 40, width: width * 0.85, height: 40, borderColor: 'black',
                    borderRadius: 10, borderWidth: 1, left: 30
                  }}
                  onSelect ={(value) => this.setState({reason: value==='0'?'Planned Leave':'Unplaned Leave'})}
                  textStyle={{ fontSize: 16, left: 10, top: 8 }}
                  dropdownStyle={{ width: width * 0.85, height: 85, borderColor: 'black', borderWidth: 1 }}
                  defaultValue={"Planned Leaves"}
                  dropdownTextStyle={{ fontSize: 16, color: 'black' }} />
                <Image source={AppImages.down_arrow}
                  style={{ width: 10, height: 10, left: width * 0.83, bottom: 25 }} />
              </View>
            </View>
                
            <View style={{ height: 30 }} />
          </SafeAreaView>
          
        </ScrollView>

        <Dialog
   visible={this.state.visible}
   onTouchOutside={() => this.setState({visible:false})}>
   
   <DialogContent>
 <View  style={{padding:5}}>
   <View style={{width:270}}>
  <Text style={{textAlign:'center',margin:10}}>{this.state.data1.Message}</Text> 
  </View>
  <TouchableOpacity onPress={this.hideAlert}>
     <View style={{alignSelf:'center',top:10,backgroundColor:'#DD6B55',
  paddingHorizontal:20,paddingVertical:10,borderRadius:10}}>
    <Text style={{fontSize:12,textAlign:'center',color:'white'}}>OK</Text>           
    </View></TouchableOpacity>   
  </View>
  </DialogContent>
</Dialog>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //margin:50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#e3e5e8',

    bottom: 6,
    width: width * 0.96,
    //height: 100

  },
  Righttext: {
    padding: 15,
    color: 'red'
    , fontSize: 16,
    bottom: 2
  },
  header: {
    height: height * 0.082,
    flexDirection: 'row',
    backgroundColor: 'white',
    ...Platform.select({
      android: {

      },
      ios: {
      }
    })
  },
  top: {
    ...Platform.select({
      android: { height: 0 },
      ios: { height: 35 }
    })
  },
});