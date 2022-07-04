//This is an example code for Navigator// 
import React, { Component } from 'react';

//import react in our code. 
import { StyleSheet,SafeAreaView, View, Text,TouchableOpacity,Dimensions,ScrollView,ImageBackground,Image,ActivityIndicator,FlatList} from 'react-native';
import Pie from 'react-native-pie';
//import { ScrollView } from 'react-native-gesture-handler';
//import all the components we are going to use.
import AppImages from '../../utils/AppImages';
const { width, height } = Dimensions.get('window');
import { simpleGetCall } from '../../api/ApiServices';
import {UIActivityIndicator} from 'react-native-indicators';
import Dialog,{DialogContent} from 'react-native-popup-dialog';
import ApiConfig from '../../api/ApiConfig';
import AppArray from '../../utils/AppArray';
import moment from 'moment';
let count=0
//let mr=[];
export default class LeaveHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      data1:[],
      isProcessing:false,
      isOpen:false,
      count:0,
      mr:[],
      leave:[],
      Mar:[],
      Jan:[],
      Month:[],
      open:false,
      visible:false,
      swi:false,
      aler:false

    }
  }

  static navigationOptions = () => ({
    title: 'Leave History',
    headerTitleStyle: { 
      textAlign:"center", 
      color:'red',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      headerLayoutPreset: 'center'
  },
});
componentDidMount(){
  this.leaveHistory()
}

  leaveHistory = () => {
  this.setState({ isProcessing: true,visible:true});
    simpleGetCall(ApiConfig.Leave_History)
    .then((data) => {
      this.setState({ isProcessing: false,visible:false});
      // console.log(data)
      this.setState({data:data })
      this.parseData(data)
    })
  }
  parseData=(data)=>{
    let arr=[];
    let arr1=[];
      
    //console.log(data.LeavesApplications?data.LeavesApplications.length:0)
    if(data.LeavesApplications.length>0){
      arr =data.LeavesApplications.map(item=>({
        LeaveFrom:item.LeaveFrom,
        //mr:moment(item.LeaveFrom).format('M')==='3'?this.state.mr.push(item.LeaveFrom):0,
        LeaveTo:item.LeaveTo,
        LeaveApplicationDate:item.LeaveApplicationDate,
        EntryDate:item.EntryDate,
        Status:item.Status,
        Reason:item.Reason,
        Leaves:item.Leaves,
        NoOfLeave:item.NoOfLeave

        
    }))
     this.setState({data1:arr,leave:arr[0].Leaves[0].Date})
     console.log(this.state.leave)
     console.log(this.state.data1)
     console.log(data.LeavesApplications?data.LeavesApplications.Leaves:'')
     console.log(moment(this.state.data1[0].LeaveFrom).format('M')==='4'?'t':'f')
      let freq=[];
      let k=0,month={};
      let Mar=[],Jan=[],Feb=[],Apr=[],May=[],Jun=[],Jul=[],Aug=[],
      Sep=[],Oct=[],Nov=[],Dec=[]
      
      for(let i=0;i<arr.length;i++){
          if(arr[i].Leaves.length>0){
            arr1.push(arr[i])
          }
        for(let j=0;j<arr[i].Leaves.length;j++){
        freq[k]=arr[i].Leaves[j];
        switch(moment(freq[k].Date).format('M')){
          case '1':
                  Jan.push(freq[k]);
                 break;
          case '2':
                 Feb.push(freq[k]) ;  
                 break;
          case '3':
                Mar.push(freq[k]);
                break;
         case '4':
                Apr.push(freq[k]);
                break;
         case '5':
               May.push(freq[k]);
                break;
        case '6':
               Jun.push(freq[k]);
               break; 
        case '7':
               Jul.push(freq[k]);
              break;
        case '8':
               Aug.push(freq[k]);
              break;
        case '9':
              Sep.push(freq[k]);
              break; 
        case '10':
              Oct.push(freq[k]);
              break;
        case '11':
              Nov.push(freq[k]);
              break;
        case '12':
              Dec.push(freq[k]);
                                
        }
        k++;
        }
        
        month ={
          Jan:Jan,
          Feb:Feb,
          Mar:Mar,
          Apr:Apr,
          May:May,
          Jun:Jun,
          Jul:Jul,
          Aug:Aug,
          Sep:Sep,
          Oct:Oct,
          Nov:Nov,
          Dec:Dec,
        }
      }
     
      
      this.setState({mr:freq,Mar:Mar,Jan:Jan,Month:month})
      console.log(freq)
      var count = Object.keys(this.state.Month).length;
     console.log(count)
      let temp=[];
      let m=0;
     console.log(this.state.Month.Nov.length)
     
  }
  else{
    this.setState({data1:arr})
  }
  }
  alerts=()=>{
    this.setState({aler:true})
  }
  close=()=>{
    this.setState({aler:false})
  }
  openView=(key)=>{
            const ke=key
            
    this.setState({isOpen:key,swi:!this.state.swi
      ,open:true})
  }
      
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={{ fontSize: 20, fontWeight: '500', left: 10 }}>Leave Balance</Text>
          {this.state.data?this.state.data.LeaveTypes && this.state.data.LeaveTypes.map((item)=>(

          
          <Text style={{  fontSize: 16, left: 10,margin:5 }}>
            {item.LeaveTypeName}
    <Text style={{color:'red',fontSize:16,}}>  {item.TotalLeaveBalance}.0</Text>
          <Text style={{color:'#0f4a03',fontSize:16}}>/{item.YearlyLeaves}.0</Text>
            </Text>)):''} 
        </View>
        <View style={{width:width,height:1,backgroundColor:'lightgrey',top:20}}/>
      
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
        <SafeAreaView style={{flex:2,top:20,flexWrap:'wrap'}}>
        <ScrollView contentContainerStyle={{paddingVertical:20,paddingBottom:20,}}>
          <View >
          <View >
          <View style={{justifyContent:'center',alignItems:'center',
        padding:10,width:width,}}>
        <Text style={{fontSize:16,}}>Annual Leave Summary</Text>
        <View style={{top:60,right:80,transform: [{ rotate: '-60deg' }],justifyContent:'center',}}>  
       
        <Pie
              radius={66}
              innerRadius={40}
              sections={[
                // {
                //   percentage: (this.state.data.YearlyLeaves?this.state.data.YearlyLeaves/this.state.data.YearlyLeaves*100:100),
                //   color: 'green',
                // },
                {
                  percentage: this.state.data.TotalLeaveBalance?this.state.data.TotalLeaveBalance/this.state.data.YearlyLeaves*100:0,
                  color: '#70eeff',
                },
                {
                  percentage: this.state.data.AppliedYearly?this.state.data.AppliedYearly/this.state.data.YearlyLeaves*100:0,
                  color: '#fcca03',
                },
                
              ]}
              strokeCap={'butt'}
            />
            <Text style={{textAlign:'center',fontSize:16,transform: [{ rotate: '61deg' }],top:-80,}}>{moment().format('YYYY')}</Text>
            </View>
           <View style={{right:10}}>
            <Text 
            style={{left:120,padding:3}}><View style={{width:15,height:15,borderRadius:7.5,
            backgroundColor:'green'}}/>  Total           {this.state.data.YearlyLeaves}.0</Text> 
               <Text 
            style={{left:120, padding:3}}><View style={{width:15,height:15,borderRadius:7.5,
            backgroundColor:'#87edf5',}}/>  Available     {this.state.data.TotalLeaveBalance}.0</Text> 
               <Text 
            style={{left:120,padding:3}}><View style={{width:15,height:15,borderRadius:7.5,
            backgroundColor:'yellow'}}/>  Availed        {this.state.data.AppliedYearly}.0</Text> 
              </View>
              </View> 
            {/* {this.state.mr?this.state.mr.map((item)=>
            <Text>{item}</Text>):<Text>ff</Text>} */}
            <View style={{width:width,height:1,backgroundColor:'lightgrey',top:10}}/>
            
            <Text style={{fontSize:16,left:10,top:30}}>Leaves Details</Text>
            
            {!this.state.open?
            <View style={{top:30}}>
            {this.state.mr.length>0?this.state.mr[0]?
              <View style={{top:20}}>
                <TouchableOpacity>
            <View style={{flexDirection:'row',justifyContent:'space-around',right:15}}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>{moment(this.state.mr[0].Date).format('MMM')}</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView(moment(this.state.mr[0].Date).format('MMM'))}>
          <Image source={AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.mr[0].length}</Text>
            <Text style={{right:40}}>0</Text>
          </View>
          {
            this.state.isOpen==='Jan'?
            (this.state.Month.Jan.map((item)=>
            <Text style={{left:10}}>{moment(item.Date).format('MMM DD')}</Text>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
           </View> :
            this.state.data1.length>0?
            <View style={{top:30,}}>
              {/* index[0] */}
            
          
            {/*1  */}
            {this.state.Month.Jan?this.state.Month.Jan.length>0?
              <View style={{top:20}}>
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Jan</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Jan')}>
          <Image source={this.state.swi&&this.state.isOpen==='Jan'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Jan?this.state.Month.Jan.length:0}</Text>
            <Text style={{right:40}}>{this.state.Month.Jan[0].IsAvailed}</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Jan' && this.state.swi?
            (this.state.Month.Jan.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
           {/* 2 */}
            {this.state.Month.Feb?this.state.Month.Feb.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Feb</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Feb')}>
          <Image source={this.state.swi&&this.state.isOpen==='Feb'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Feb?this.state.Month.Feb.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Feb'&& this.state.swi?
            (this.state.Month.Feb.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
            {/* 3 */}
            {this.state.Month.Mar?this.state.Month.Mar.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Mar</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Mar')}>
          <Image source={this.state.swi&&this.state.isOpen==='Mar'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Mar?this.state.Month.Mar.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Mar' && this.state.swi?
            (this.state.Month.Mar.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
          <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
              
              {/* 4 */}
              {this.state.Month.Apr?this.state.Month.Apr.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Apr</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Apr')}>
          <Image source={this.state.swi&&this.state.isOpen==='Apr'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Apr?this.state.Month.Apr.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View>
          <View style={styles.linev}/>
          {
            this.state.isOpen==='Apr'&& this.state.swi?
            (this.state.Month.Apr.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }
          </TouchableOpacity></View>:<Text></Text>:<Text></Text>}
              
              {/* 5 */}
              {this.state.Month.May?this.state.Month.May.length>0?
              <View >
                <TouchableOpacity> 
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>May</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('May')}>
          <Image source={this.state.swi&&this.state.isOpen==='May'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.May?this.state.Month.May.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='May'&& this.state.swi?
            (this.state.Month.May.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          
          {/* 6 */}
          {this.state.Month.Jun?this.state.Month.Jun.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Jun</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Jun')}>
          <Image source={this.state.swi&&this.state.isOpen==='Jun'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Jun?this.state.Month.Jun.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Jun'&& this.state.swi?
            (this.state.Month.Jun.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          {/* 7 */}
          {this.state.Month.Jul?this.state.Month.Jul.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Jul</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Jul')}>
          <Image source={this.state.swi&&this.state.isOpen==='Jul'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Jul?this.state.Month.Jul.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Jul'&& this.state.swi?
            (this.state.Month.Jul.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
         {/* 8 */}
          {this.state.Month.Aug?this.state.Month.Aug.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Aug</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Aug')}>
          <Image source={this.state.swi&&this.state.isOpen==='Aug'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Aug?this.state.Month.Aug.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Aug'&& this.state.swi?
            (this.state.Month.Aug.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          {/* 9 */}
          
          {this.state.Month.Sep?this.state.Month.Sep.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Sep</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Sep')}>
          <Image source={this.state.swi&&this.state.isOpen==='Sep'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Mar?this.state.Month.Mar.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Sep'&& this.state.swi?
            (this.state.Month.Sep.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          {/* 10 */}
          {this.state.Month.Oct?this.state.Month.Oct.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Oct</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Oct')}>
          <Image source={this.state.swi&&this.state.isOpen==='Oct'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Oct?this.state.Month.Oct.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Oct'&& this.state.swi?
            (this.state.Month.Oct.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          {/* 11 */}
          {this.state.Month.Nov?this.state.Month.Nov.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Nov</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Nov')}>
          <Image source={this.state.swi&&this.state.isOpen==='Nov'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Nov?this.state.Month.Nov.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Nov'&& this.state.swi?
            (this.state.Month.Nov.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
          
          {/* 12 */}
          {this.state.Month.Dec?this.state.Month.Dec.length>0?
              <View >
                <TouchableOpacity>
            <View style={styles.rview}>
            <ImageBackground
            source={AppImages.Date_bubble_two}
            style={{width:56,height:40,left:20}}>
              <Text style={{textAlign:"center",fontSize:16,
              color:'white',top:10,right:7}}>Dec</Text>
            </ImageBackground>
            <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'#87edf5',fontSize:16}}>Applied</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <Text style={{color:'green',fontSize:16}}>Availed</Text>
          <View style={{width:1,height:42,backgroundColor:'grey'
          ,}}/>
          <TouchableOpacity onPress={()=>this.openView('Dec')}>
          <Image source={this.state.swi&&this.state.isOpen==='Dec'?AppImages.down_arrow:AppImages.Up_Arrow2}
          style={{width:25,height:25,}}/></TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',bottom:20}}>
          <Text style={{left:40}}>{this.state.Month.Dec?this.state.Month.Mar.length:0}</Text>
            <Text style={{right:40}}>0</Text>
          </View><View style={styles.linev}/>
          {
            this.state.isOpen==='Dec'&& this.state.swi?
            (this.state.Month.Dec.map((item)=>
            <View style={styles.txtv}>
            <Text style={styles.txt}>{moment(item.Date).format('MMM DD')}</Text>
            <Text style={styles.sts}>{item.status==='A'?'':'Pending'}</Text></View>
            )):<Text></Text>
          
          }</TouchableOpacity></View>:<Text></Text>:<Text></Text>}
            </View>
             :<Text></Text>}
        </View>
            </View>
        </ScrollView></SafeAreaView>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexGrow:1,
    //margin:50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#e3e5e8',
    //right:120,
    top: 10,
    width: width*0.96,
    //height: 100

  },
  txtv:{
    flexDirection:'row',
    justifyContent:'space-around',
    //alignItems:'baseline',
    borderBottomWidth:0.4,
    borderBottomColor:'#8a8a8a',
    padding:5,
    marginBottom:10
    //margin:5
  },
  txt:{
    fontSize:14,
    right:52,
    color:'#636361',
    //bottom:4,
    margin:5

  },
  linev:{
    width:width,
    height:1,
    borderBottomWidth:1,
    borderBottomColor:'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    //shadowRadius: 1.41,
    
    elevation: 1
    
  },
  sts:{
    fontSize:14,
    right:135,
    color:'#fbc744',
    margin:5
    //bottom:20
  },
  rview:{flexDirection:'row',
  justifyContent:'space-around',
  right:15,
  flexWrap:'wrap'
  //padding:10
}
});