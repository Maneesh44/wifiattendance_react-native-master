import React, { Component } from 'react';
import { StyleSheet,Platform,View,Image,TouchableOpacity,Text,FlatList,ImageBackground,Dimensions,ScrollView, Picker} from 'react-native';
import ApiConfig from '../../api/ApiConfig'
import { postWithAuthCall } from '../../api/ApiServices'
import moment from 'moment';
import * as Progress from 'react-native-progress';
import Appimages from '../../utils/AppImages';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {UIActivityIndicator} from 'react-native-indicators';
import {WheelPicker} from "react-native-wheel-picker-android";
const wheelPickerMonth=['Janaury','February','March','April','May','June','July','August','September','October','November','December']
const wheelPickerYear=['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025']
const{height,width}=Dimensions.get('window')
export default class PunchDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    totalTime:'',
    progress: 0,
    indeterminate: true,
    defaultAnimationDialog: false,
    scaleAnimationDialog: false,
    slideAnimationDialog: false,
    Month:moment().format("MM"),
    Year:moment().format("YYYY"),
    month:moment().format("MM"),
    totalworkinSec:'',
    TodayInTime:'',
    TodayInTimeSec:'',
    selectedItemM:(parseInt(moment().format("MM"))-1),
    selectedItemY:4,
    totaltimeinmilsec:'',
   isProcessing:true,
   visible:true
    }
  }
  componentDidMount() {
    this.showUserDetails();
    this.animate();
  }
static navigationOptions = ({ navigation }) => ({
    title: 'Punch Details',
    headerTitleStyle: { 
      textAlign:"center", 
      color:'red',
      alignItems:'center',
      alignContent:'center',
      headerLayoutPreset: 'center'
  },
  headerStyle:{
    shadowColor: 'transparent',
    elevation:0
  },
headerRight: (<View />),  
});
showUserDetails() {
  let requsetBody = JSON.stringify({
    Month:this.state.Month,
    Year:this.state.Year,
  });
   postWithAuthCall(ApiConfig.MONTHWISE,requsetBody)
    .then((data) => { 
      this.parseData(data);
    }).catch((error) => {
      console.log("Used api response", error);
    });
  }
  parseData(data){
    let temp=[];
    if(data.Attendance.length>0){
    temp =data.Attendance.map(item=>({
      AttendanceId:item.AttendanceId,
      InTime: item.InTime,
      OutTime: item.OutTime,
      DayTotal: item.DayTotal,
      Remark: item.Remark,
      Status: item.Status,
      InPlatform: item.InPlatform,
      OutPlatform:item.OutPlatform,
      Warnings: item.Warnings,
      NetworkSource:item.NetworkSource,
      PunchInTime:item.PunchInTime,
      PunchOutTime:item.PunchOutTime,
      PunchInEditTime:item.PunchInEditTime,
      PunchOutEditTime:item.PunchOutEditTime
    }))
     var OutTime=data.ShiftTime.OutTime
     var InTime=data.ShiftTime.InTime
     var startTime = moment(InTime, "HH:mm:ss A");
     var endTime = moment(OutTime, "HH:mm:ss A");
     var duration = moment.duration(endTime.diff(startTime));
     var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes())%60;
    var secand= duration.asSeconds();
    var milsecans=duration.asMilliseconds();
//Printing Live percentage on progress bar 
var intime=moment(data.Attendance[0].InTime).add('19820','seconds')
var currtime=moment()
var intimeP=moment(intime)
var currtimeP=moment(currtime)
var durationP = moment.duration(currtimeP.diff(intimeP));
var secandsP=durationP.asSeconds()
this.setState({data:temp,totalTime:((hours*60+minutes)/60),totalworkinSec:secand,totaltimeinmilsec:milsecans,TodayInTime:data.Attendance[0].InTime,TodayInTimeSec:secandsP,
isProcessing:false,visible:false});  
  }
  else{
    this.setState({data:temp,isProcessing:false,visible:false})
  }
  }
  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        this.state.data.length>0?
      progress= (this.state.TodayInTimeSec/this.state.totalworkinSec):progress=0;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      },1000);
    },1000);
  }
  onItemSelectedM =selectedItemM => {
    this.setState({selectedItemM});
    this.setMonth();
  };
  setMonth(){
this.setState({Month:parseInt(this.state.selectedItemM)+1})
  }

  onItemSelectedY = selectedItemY=> {
    this.setState({ selectedItemY });
    this.setYear();
  };
  setYear(){
   this.setState({Year:wheelPickerYear[this.state.selectedItemY]}) 
  }
    render() { 
// Printing Live percentage on progress bar
var intime=moment(this.state.TodayInTime).add('19820','seconds')
var currtime=moment()
var intimeP=moment(intime)
var currtimeP=moment(currtime)
var durationP = moment.duration(currtimeP.diff(intimeP));
 var secandsP=durationP.asSeconds()
    return (
  
<View style={styles.container}>
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
  <View style={styles.container1}>
    <View>
   
  <TouchableOpacity onPress={() => {this.setState({defaultAnimationDialog: true});}}>
    <Text  style={styles.textDate}>{moment(this.state.month, 'MM').format('MMMM')+"  "+this.state.Year}   <Image source={require('../../assets/images/down_arrow.png')} style={{height:20,width:20}}/></Text></TouchableOpacity>
        <Dialog
          onDismiss={() => {
          this.setState({ defaultAnimationDialog: false });
          }}
          width={0.7} 
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={<DialogTitle style={{backgroundColor:'#f2693f'}} title={moment(this.state.Month, 'MM').format('MMMM')+" "+this.state.Year} />}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false,month:this.state.Month,isProcessing:true,visible:true}),this.showUserDetails();
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent>{
            Platform.OS==='ios'?
            <View style={{flexDirection:'row',right:15}}>
            <Picker
             style={{top:-27,width:120,height:150,left:10}}
            selectedValue={this.state.Month}
            onValueChange={(itemValue)=>this.setState({Month:itemValue})}>
              <Picker.Item value='01' label="January"/>
              <Picker.Item value='02'label="February"/>
              <Picker.Item value='03' label="March"/>
              <Picker.Item value='04' label="April"/>
              <Picker.Item value='05' label="May"/>
              <Picker.Item value='06' label="June"/>
              <Picker.Item value='07' label="July"/>
              <Picker.Item value='08' label="August"/>
              <Picker.Item value='09' label="September"/>
              <Picker.Item value='10'label="October"/>
              <Picker.Item value='11' label="November"/>
              <Picker.Item value='12' label="December"/>
            </Picker>
            <Picker
            style={{top:-27,width:120,height:150,left:20}}
            selectedValue={this.state.Year}
            onValueChange={(itemValue)=>this.setState({Year:itemValue})}>
              <Picker.Item value='2016' label="2016"/>
              <Picker.Item value='2017'label="2017"/>
              <Picker.Item value='2018' label="2018"/>
              <Picker.Item value='2019' label="2019"/>
              <Picker.Item value='2020' label="2020"/>
              <Picker.Item value='2021' label="2021"/>
              <Picker.Item value='2022' label="2022"/>
              <Picker.Item value='2023' label="2023"/>
              <Picker.Item value='2024' label="2024"/>
              <Picker.Item value='2025'label="2025"/>
            </Picker>
        </View>:
        
        <View style={{flexDirection:'row'}}>
  <WheelPicker
   style={{top:15,width:120,height:150}}
          selectedItem={this.state.selectedItemM}
          data={wheelPickerMonth}
          onItemSelected={this.onItemSelectedM}
        />
<WheelPicker
 style={{top:15,width:120,height:150}}
          selectedItem={this.state.selectedItemY}
          data={wheelPickerYear}
          onItemSelected={this.onItemSelectedY}
        />
        </View>
         }
        </DialogContent>
        </Dialog>
        </View>
    <Text onPress={() => {
      this.props.navigation.navigate('Summary');}}
    style={{left:100,fontSize:18,color:'red',top:8}}>SUMMARY
    </Text>
    </View>
    <View style={{width:390,height:1,backgroundColor:'lightgrey',top:30}}/>
    <View style={{top:30,width:'92%',height:height*0.775,left:10}}>
      {
       this.state.data.length>0?
      <FlatList
        data={ 
          this.state.data
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => 
      <View style={{top:20}}> 
      <View style={styles.scontainer}>
      <Text>{moment(item.InTime).format('ddd')}</Text>
      <ImageBackground
      source={ item.Remark==="Weekend"||item.Remark==="Absent"?Appimages.Date_bubble_two:Appimages.Dare_bubble_one}
      style={{width:42,height:30}}>
      <Text style={{textAlign:'center',top:7,right:6,color:'white'}}>{moment(item.InTime).format('DD')}</Text>
      <View style={{width:1,height:90,backgroundColor:'grey',bottom:95,left:38}}/>
      <View style={{width:1,height:50,backgroundColor:'grey',bottom:90,left:38}}/>
      </ImageBackground>
      <Progress.Bar
     indeterminate={this.state.indeterminate}
      progress={ 
        item.OutTime===null&& item.Remark==='Present'?secandsP/this.state.totalworkinSec
        :item.DayTotal/this.state.totalTime
      }
      width={width*0.65} height={30}
      style={{left:62,bottom:28}}
      color={'#1ac141'}
      showsText={true}
      borderWidth={0}
      unfilledColor={item.Remark==='Present'||item.Remark==="Miss punch"||item.OutTime!==null?'silver':'#f9b423'}
      />
      {
        
      item.Remark==='Present'|| item.OutTime!==null?
      item.OutTime===null?
      <Text style={{alignSelf:'center',top:-51,color:'white',fontSize:15}}>
        {
   
        parseInt((secandsP/this.state.totalworkinSec)*100)} % </Text>
        :
        <Text  style={{alignSelf:'center',top:-51,color:'white',fontSize:15}}>
          {
          Math.round(((moment(item.OutTime)-moment(item.InTime)))/this.state.totaltimeinmilsec*100)>=100?"100":
          Math.round(((moment(item.OutTime)-moment(item.InTime)))/this.state.totaltimeinmilsec*100)
          } %</Text>
        :
         <Text style={{alignSelf:'center',top:-51,color:'white',fontSize:15}}>{item.Remark}</Text>
         }
      {
      item.Remark==='Present'|| item.Remark==="Miss punch"||item.OutTime!==null?
      <Text style={{bottom:45,left:62,
      color:'#1ac141',fontSize:10}}>{moment(item.InTime).add('5.50',"hours").format('LT')}</Text>:<Text></Text>
      }
      {
      item.OutTime===null?<Text></Text>:
      <Text style={{left:300,bottom:57,
      color:'#1ac141',fontSize:10}}>{moment(item.OutTime).add('5.50',"hours").format('LT')}</Text>
       }
      </View>   
        <View style={{top:10,position:'absolute',left:width*0.826}}>
           {
          item.Remark==="Absent" && item.DayTotal===0?<Text></Text>:
          item.Remark==="Miss punch"||item.Remark==="Weekend"&&item.OutTime===null? <Text></Text>:
           item.Remark==='Present' && item.OutTime===null?<Text style={{fontSize:11,color:'#1ac141'}}>{"\n"}Hrs</Text>:
          <Text style={{color:'#1ac141',fontSize:13}}>{item.DayTotal}{"\n"}<Text style={{fontSize:11}}>Hrs</Text></Text>
          }
        </View>   
    </View> 
    }
    />:this.state.isProcessing===true?<Text></Text>:
    <Text style={{fontWeight:'300',fontSize:18,top:'50%',alignSelf:'center'}}>data unavailable for selected month</Text>
    }
  </View>
 </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container1:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'stretch',
    left:-35,
    top:10
  },
  textDate:{
    left:-30,
    top:7,
    fontSize:17
  },
  container2:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'stretch',
    left:-50
  },
  scontainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    height:100
  },
  cal1:{
   borderRadius:10,
    top:'50%',
    flexDirection:'row',
      height:height*0.25,
      width:width*0.75,
    alignSelf:'center',    
  },
});