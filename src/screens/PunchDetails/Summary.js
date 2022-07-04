import React, { Component } from 'react';
import {
StyleSheet,
ScrollView,
 View,
Text,
Dimensions,
Image
} from 'react-native';
import ApiConfig from '../../api/ApiConfig'
import { postWithAuthCall } from '../../api/ApiServices'
 import Pie from 'react-native-pie'
import {Card} from 'react-native-paper';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import Backbutton from '../../components/Backbutton';
const {height,width}=Dimensions.get('window');
export default class App extends Component {
constructor(props){
  super(props);
  this.state={
    date: moment(),
    data: {},
    LatePunchIn:'',
    MissPunch:'',
    EarlyOut:'',
    TotalWorkDaysInMonth:'',
    LatePunchPER:'',
    MissPunchPER:'',
    EarlyOutPER:'',
    TotalPER:'',
    
  }
}
  static navigationOptions = ({ navigation }) => ({
    title: 'Summary',
    headerTitleStyle: { 
      textAlign:"center", 
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      headerLayoutPreset: 'center'
  },
    headerRight: (<View />),
    headerLeft: (
        <Backbutton
            onPress={() => {
                const backPage = navigation.getParam('backPage', 'Punch');
                navigation.navigate(backPage);
            }}
        />
    )
});
componentDidMount() {
  this.showUserDetails();
  this.TotalDaysInMonth();
 }
showUserDetails() {
  let requsetBody = JSON.stringify({
    Month:moment(this.state.date).format('MM'),
    Year:moment(this.state.date).format('YYYY')
  });
   postWithAuthCall(ApiConfig.DEDUCTION, requsetBody)
    .then((data) => {
      if (data.Month) {
        this.setState({ data:data,LatePunchIn:data.LatePunchIn.length,MissPunch:data.MissPunchOut.length,EarlyOut:data.EarlyOuts.length});
        this.percentages();
      }
    }).catch((error) => {
      console.log("Used api response", error);
    });
}
TotalDaysInMonth(){
  let count=0;
  let days=this.state.date.daysInMonth();
  let firstDay =moment(this.state.date).startOf('month')
  // let endDay = moment(this.state.date).endOf('month').format("d")
  for(let i=1;i<=days;i++){
  let day=moment(firstDay).add(i,'days').format("d");
  if(day==0||day==6){
      count++;
       }
  }
let total=days-count;
this.setState({TotalWorkDaysInMonth:total,})
}
percentages(){
  
  let latePunchPER=(this.state.LatePunchIn/this.state.TotalWorkDaysInMonth)*100
  let missPunchPER=(this.state.MissPunch/this.state.TotalWorkDaysInMonth)*100
  let earlyOutPER=(this.state.EarlyOut/this.state.TotalWorkDaysInMonth)*100
  let totalPER=100-latePunchPER-missPunchPER-earlyOutPER;
  this.setState({LatePunchPER:latePunchPER,MissPunchPER:missPunchPER,
  EarlyOutPER:earlyOutPER,TotalPER:totalPER})
}
render() {
return (
<View style={styles.container}>
<ScrollView>
<View style={styles.card1} >
  <Text style={styles.text1}>Summary of Working Hours</Text>
  <View style={styles.card1img}>
  <Text style={styles.circleTime1}>{this.state.data.WorkedHours}</Text>
<Text style={styles.circleText1}>Worked Hours</Text>
  </View>
  <View style={styles.card2img}>
  <Text style={styles.circleTime2}> {this.state.data.WorkingHours}</Text>
<Text style={styles.circleText2}>Total Hours</Text>
  </View>
  <View style={styles.card3img}>
  <Text style={styles.circleTime3}>{this.state.data.Deduction}</Text>
<Text style={styles.circleText3}>Deduction</Text>
  </View>
</View>
<Card style={styles.card2} >
<Text style={styles.textAtt}>Attendance Summary</Text>
<View style={{alignSelf:'center',top:'20%'}}>
<Text style={{position:'absolute',fontSize:23,alignSelf:'center',top:'35%',color:'gray'}}>
{moment(this.state.date).format("MMMM")}{"\n"} {(this.state.date).format("YYYY")}</Text>
<Pie
             radius={85}
             innerRadius={70}

              sections={[
                {
                  percentage:this.state.TotalPER,
                  color: '#c8c8c8',
                },
                {
                  percentage:this.state.LatePunchPER,
                  color: 'red',
                },
                {
                  percentage:this.state.EarlyOutPER,
                  color: 'yellow',
                },
                {
                  percentage:this.state.EarlyOutPER,
                  color:'#008ECC',
                },
              ]}
              strokeCap={'butt'}
            />
</View>
<View style={{top:'30%'}}>
<View style={{flexDirection:"row",alignSelf:'center'}}>
<View style={styles.greenbox}>
<Text style={styles.textOn}>On Time</Text>
<Text style={styles.textpipeG}>|</Text>
<Text style={styles.textDayG}>0 Day</Text>
</View>
<View style={styles.redbox}>
<Text style={styles.textOn}>Late Punch In</Text>
<Text style={styles.textpipeR}>
|</Text>
<Text style={styles.textDayR}>{this.state.data.LatePunchIn && this.state.data.LatePunchIn.length } Day</Text>
</View>
</View>
<View style={{flexDirection:"row",alignSelf:'center'}}>
<View style={styles.orangebox}>
<Text style={styles.textOn}>Early punch out</Text>
<Text style={styles.textpipeY}>|</Text>
<Text style={styles.textDayY}>{this.state.data.EarlyOuts && this.state.data.EarlyOuts.length } Day</Text>
</View>
<View style={styles.bluebox}>
<Text style={styles.textOn}>Miss punch</Text>
<Text style={styles.textpipeB}>|</Text>
<Text style={styles.textDayB}>{this.state.data.MissPunchOut && this.state.data.MissPunchOut.length} Day</Text>
</View>
</View></View>
</Card >
<Card style={styles.card3} >
<Text style={styles.textAtthel} >Attendance Health</Text>
<Image source={require('../../assets/images/1.png')} style={styles.img1} />
<Image source={require('../../assets/images/2.png')} style={styles.img2} />
<Image source={require('../../assets/images/3.png')} style={styles.img3} />
<Image source={require('../../assets/images/4.png')} style={styles.img4} />
<Image source={require('../../assets/images/5.png')} style={styles.img5} />
</Card >
</ScrollView> 
</View>
);
}
}
const styles =StyleSheet.create({
container:{
flex:1,
backgroundColor:'#c8c8c8',
alignItems:'center'
},
card1:{
height:175,
marginTop:10,
width:width*0.96,
borderRadius:2,
backgroundColor:'white',
flexDirection:'column'
},
card2:{
  height:420,
  top:10,
  borderRadius:2},

  card3:{
    height:130,
    top:20,
    borderBottomEndRadius:50,
    borderBottomStartRadius:50
  },
    text1:{
      left:10,
      top:10
    },
    card1img:{
      height:90,
      width:90,
      borderRadius:75,
    left:'7%',
     top:'20%',
      backgroundColor:'#008ECC'
    },
    card2img:{
      height:90,
      width:90,
      borderRadius:75,
      left:'38%',
      top:'-33%',
      backgroundColor:'#4CBB17'
    },
    card3img:{
      height:90,
      width:90,
      borderRadius:75,
     left:'68%',
     top:'-85%',
      backgroundColor:'#ff8c00'
    },
    circleTime1:{
      color:'white',
      alignSelf:'center',
      top:20,
       fontSize:18,
       fontWeight:'400' 
    },
    circleText1:{
      color:'white',
      left:10, top:20,
   
       fontSize:11,
       
    },
    circleTime2:{
      color:'white',
      left:30, top:20,
       fontSize:18,
       fontWeight:'400' 
    },
    circleText2:{
      color:'white',
      left:10, 
      top:20,
       fontSize:12,
    },
    circleTime3:{
      color:'white',
      alignSelf:'center',
      top:20,
       fontSize:18,
       fontWeight:'400' 
    },
    circleText3:{
      color:'white',
      alignSelf:'center', top:20,
       fontSize:12,  
    },
      greenbox:{
        flexDirection:"row",
        borderColor:'#4CBB17',
        borderWidth:1,
        borderRadius:25,
        height:40,
        width:'45%',
        margin:5,
        paddingLeft:10,
    },
bluebox:{
borderColor:'#008ECC',
borderWidth:1,
borderRadius:25,
height:40,
width:'45%',
margin:5,
paddingLeft:10,
flexDirection:"row",
},
orangebox:{
  borderColor:'orange',
  borderWidth:1,
  borderRadius:25,
  height:40,
  width:'45%', 
  margin:5,
  paddingLeft:10,
  flexDirection:"row", 
},
redbox:{
  borderColor:'red',
  borderWidth:1,
  borderRadius:25,
  height:40,
  width:'45%',
  margin:5,
  flexDirection:"row",
  paddingLeft:10,
},
textAtt:
  {fontSize:14,
    fontWeight:'300',
    marginLeft:10,
    top:8
},
textOn:
  {
    fontSize:13,
    fontWeight:'400',
   top:10, 
},
textpipeG:{
  fontSize:22,
  left:width*0.11,
},
textpipeR:{
  fontSize:22,
  left:width*0.04,
},
textpipeY:{
  fontSize:22,
  left:width*0.01,
},
textpipeB:{
  fontSize:22,
  left:width*0.07,
},
  textDayG:{
    fontSize:12,
    fontWeight:'300',  
    left:'140%',
    top:'6%' 
},
textDayR:{
  fontSize:12,
  fontWeight:'300',  
  left:'50%',
  top:'6%' 
},textDayB:{
  fontSize:12,
  fontWeight:'300',  
  left:'85%',
  top:'6%' 
},textDayY:{
  fontSize:12,
  fontWeight:'300',  
  left:'30%',
  top:'6%' 
},
textAtthel:{
  fontSize:16,
    fontWeight:'600',
    marginTop:15,
  marginLeft:10
},
img1:{
  height:50,
  width:50,
  position:'absolute',
  marginTop:45,
  marginLeft:30,
},
img2:{
  height:50,
  width:50,
  position:'absolute',
  marginTop:45,
  marginLeft:95,
},
img3:{
  height:50,
  width:50,
  position:'absolute',
  marginTop:45,
  marginLeft:160,
},
img4:{
  height:47,
  width:47,
  position:'absolute',
  marginTop:45,
  marginLeft:230,
},
img5:{
  height:60,
  width:60,
  position:'absolute',
  marginTop:40,
  marginLeft:290,
},
});