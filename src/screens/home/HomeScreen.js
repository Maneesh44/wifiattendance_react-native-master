
import React, { Component } from 'react';

import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, ImageBackground, TouchableOpacity, Alert } from 'react-native';

import MenuImage from '../../components/MenuImage/MenuImage';

import Name from '../../components/MenuButton/Name';
import moment from 'moment';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { UIActivityIndicator } from 'react-native-indicators';
import AppImages from '../../utils/AppImages';
import * as Progress from 'react-native-progress';
import { simpleGetCall, postWithAuthCall } from '../../api/ApiServices';
import ApiConfig from '../../api/ApiConfig';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const colors = ['green', 'black', 'black', 'black', 'black', 'black', 'green',]
var arr = [];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      isStopwatchStart: false,
      toggle: moment().format('YYYY-MM-DD'),
      isProcessing: false,
      data: {},
      data1: {},
      col: AppImages.Weekday_bg,
      img: true,
      src: AppImages.Time_circle,
      col1: 'white',
      sts: 0,
      intime: '',
      outtime: '',
      lat: 0,
      long: 0,
      sure: false,
      daytotal: 0,
      add:[],
      visible: true,
      showAlert: false
    };
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerTitleStyle: {
      color: 'red',
    },
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0
    },
    headerRight: (<Name style={{
      color: 'red', textAlign: 'center', right: 35,
      fontSize: 19, padding: 10, bottom: 2
    }} />),
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  hideAlert = () => {
    this.setState({
      showAlert: false,
      sure: false
    });
  };


  startStopStopWatch() {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      });

      if ((this.state.lat).toFixed(2) !== 18.58 && Math.abs((this.state.long).toFixed(2)) !== 73.88) {
        Alert.alert(
          //title
          '',
          //body
          'You are punching in/out using mobile data. A notification will be sent to your reporting manager.',
          [
            { text: this.state.sts === 0 ? 'PUNCH IN' : 'PUNCH OUT', onPress: () => this.locationDetails() },
            {
              text: 'CANCEL',
              //onPress: () => console.log('No Pressed'),
              style: 'cancel',

            },

          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
      else {
        this.setState({ sure: true })

      }
    }
    )
    this.setState({
      isStopwatchStart: this.state.isStopwatchStart,
      resetStopwatch: false,
      
    });

  }
  _hide = (key) => {
    this.setState({ sure: key })
    if (this.state.sure !== key) {
      this.locationDetails();
    }
  }

  componentDidMount() {
    this.getWeekdays();
  }
  animate() {

    let progress = 0;

    this.setState({ progress });
    setTimeout(() => {

      setInterval(() => {

        this.setState({ progress });

      }, 1000);
    }, 1000);
  }
  locationDetails() {
    let requsetBody = JSON.stringify({
      lat: this.state.lat,
      long: this.state.long
    });
    this.setState({ isProcessing: true, visible: true })
    postWithAuthCall(ApiConfig.PUNCH_IN_OUT, requsetBody)
      
      .then((data1) => {
        this.getWeekdays();

        // console.log(data1)
        this.setState({ data1: data1, showAlert: true })


      }).catch((error) => {
        console.log("Used api response", error);
      });
  }
  getWeekdays = () => {
    this.setState({ isProcessing: true });
    simpleGetCall(ApiConfig.Weekly_Punch)
      .then((data) => {
        //this.setState({ isProcessing: false,});
        if (data.Name) {
          this.setState({
             data: data,add:data.addDates,
            isProcessing: false, visible: false, toggle: moment().format('YYYY-MM-DD'),
          });
          
           //console.log("data1" + data.Fri?data.Fri.StatusPunch:'0');
          // console.log(this.state.data.addDates);
          switch (data.CurrentDay) {
            case "Monday":
              const day1=data.Mon?data.Mon:''
              this.setState({
                sts: day1.StatusPunch,
                isStopwatchStart: day1.StatusPunch === 1 ? true : false ,
                intime: day1.Timein,
                daytotal:day1.DayTotal,
                outtime: day1.Timeout,
                src: day1.StatusPunch === 0 ? AppImages.Time_circle :
                day1.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
              })
              break;
            case "Tuesday":
              const day2=data.Tue ? data.Tue :''
              this.setState({
                sts:day2.StatusPunch ,
                isStopwatchStart: day2.StatusPunch === 1 ? true : false ,
                intime: day2.Timein ,
                daytotal:day2.DayTotal ,
                outtime: day2.Timeout ,
                src: day2.StatusPunch === 0 ? AppImages.Time_circle :
                day2.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
              })
              break;
            case "Wednesday":
              const day3=data.Wed ? data.Wed : ''
                this.setState({
                  sts:day3.StatusPunch ,
                  isStopwatchStart: day3.StatusPunch === 1 ? true : false ,
                  intime: day3.Timein ,
                  daytotal:day3.DayTotal ,
                  outtime: day3.Timeout ,
                  src: day3.StatusPunch === 0 ? AppImages.Time_circle :
                  day3.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
                })
              break;
            case "Thursday":
                const day4=data.Thu ? data.Thu : ''
                this.setState({
                  sts:day4.StatusPunch ,
                  isStopwatchStart: day4.StatusPunch === 1 ? true : false ,
                  intime: day4.Timein ,
                  daytotal:day4.DayTotal ,
                  outtime: day4.Timeout ,
                  src: day4.StatusPunch === 0 ? AppImages.Time_circle :
                  day4.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
                })
              break;
            case "Friday":
                const day5=data.Fri ? data.Fri : ''
                this.setState({
                  sts:day5.StatusPunch ,
                  isStopwatchStart: day5.StatusPunch === 1 ? true : false ,
                  intime: day5.Timein ,
                  daytotal:day5.DayTotal ,
                  outtime: day5.Timeout ,
                  src: day5.StatusPunch === 0 ? AppImages.Time_circle :
                  day5.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
                })
              break;
            case "Saturday":
              const day6=data.Sat?data.Sat:''
              this.setState({
                sts: day6.StatusPunch,
                isStopwatchStart: day6.StatusPunch === 1 ? true : false ,
                intime:day6.Timein ,
                daytotal: day6.DayTotal,
                outtime: day6.Timeout ,
                src:day6.StatusPunch === 0 ? AppImages.Time_circle :
                day6.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
              })
              break;
            case "Sunday":
                const day7=data.Sun ? data.Sun : ''
                this.setState({
                  sts:day7.StatusPunch ,
                  isStopwatchStart: day7.StatusPunch === 1 ? true : false ,
                  intime: day7.Timein ,
                  daytotal:day7.DayTotal ,
                  outtime: day7.Timeout ,
                  src: day7.StatusPunch === 0 ? AppImages.Time_circle :
                  day7.StatusPunch === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon
                })
          }

          this.animate();

        }
      }).catch((error) => {
        console.log(" api response error", error);
        this.setState({ isProcessing: false, visible: false, invalid: true, errorMessage: error.message });
      });
  }


  _onPress = (key) => {
    this.setState({
      toggle: key,
      img: false,
      src: moment(key).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') ?
        AppImages.Futurepunchout_icon
        : moment(key).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? this.state.sts === 0 ?
          AppImages.Time_circle : this.state.sts === 1 ? AppImages.Time_punchout : AppImages.Punchoutcircle_icon :
          moment(key).format('ddd') === 'Sun' ? AppImages.Futurepunchout_icon : AppImages.Punchoutcircle_icon,
      col1: 'black',
      punchout: false
    })
    
    const days=this.state.data;

    switch (moment(key).format('dddd')) {
      case "Monday":

        this.setState({
          intime: days.Mon ? days.Mon.Timein : '',
          outtime: days.Mon ? days.Mon.Timeout : '',
          daytotal: days.Mon ? days.Mon.DayTotal : 0
        })
        break;
      case "Tuesday":
        this.setState({
          intime: days.Tue ? days.Tue.Timein : '',
          outtime: days.Tue ? days.Tue.Timeout : '',
          daytotal: days.Tue ? days.Tue.DayTotal : 0
        })
        break;
      case "Wednesday":
        this.setState({
          intime: days.Wed ? days.Wed.Timein : '0',
          outtime: days.Wed ? days.Wed.Timeout : '',
          daytotal: days.Wed ? days.Wed.DayTotal : 0,
        })
        break;
      case "Thursday":
        this.setState({
          intime: days.Thu ? days.Thu.Timein : '',
          outtime: days.Thu ? days.Thu.Timeout : '',
          daytotal: days.Thu ? days.Thu.DayTotal : 0
        })
        break;
      case "Friday":
        this.setState({
          intime: days.Fri ? days.Fri.Timein : '',
          outtime: days.Fri ? days.Fri.Timeout : '',
          daytotal: days.Fri ?days.Fri.DayTotal : 0
        })
        break;
      case "Saturday":
        this.setState({
          intime: days.Sat ? days.Sat.Timein : '',
          outtime: days.Sat ? days.Sat.Timeout : '',
          daytotal: days.Sat ? days.Sat.DayTotal : 0
        })
        break;
      case "Sunday":
        this.setState({
          intime: days.Sun ? days.Sun.Timein : '',
          outtime: days.Sun ? days.Sun.Timeout : '',
          daytotal: days.Sun ? days.Sun.DayTotal : 0
        })
    }
  }
  render() {
    const intime  = this.state.intime;
    let x = moment(intime === '' ? '0' : intime).format('H') * 60 * 60
      + parseInt(moment(intime === '' ? '0' : intime).format('mm') * 60)
      + parseInt(moment(intime === '' ? '0' : intime).format('ss'));


    let y = moment().utc().format('H') * 60 * 60 +
      parseInt(moment().utc().format('mm') * 60) +
      parseInt(moment().utc().format('ss'));
    // console.log((y-x)/32400)

    arr = this.state.data?this.state.data.addDates:'';
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-around',top:5}}>

        { this.state.add.map((item,index)=>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <TouchableOpacity
        onPress={() => this._onPress(item.Dates)}>
           {item.Dates === this.state.toggle ?
                    <Image source={AppImages.Weekday_bg}
                      style={styles.weekday_bg} /> :
                    item.Dates === moment().format('YYYY-MM-DD') ?
                      <View
                        style={styles.weekday_bg} /> :
                      <View style={styles.weekday_bg} />}
                      <View>
                      <Text style={[styles.txt, {
                    color: [item.Dates === this.state.toggle ? 'white' : item.Dates === moment().format('YYYY-MM-DD') ? this.state.col1 : colors[index % colors.length]],

                  }]} >
                    {item.DayName.toUpperCase()}</Text>
                        </View>
                        <View>
                        <Text style={[styles.txt2, {textAlign:'center',
                  fontFamily: 'Roboto-CondensedItalic',
                  color: (moment().format('YYYY-MM-DD') == item.Dates ? 'red' : 'black')
                }]}
                  onPress={() => this._onPress(item.Dates)}>{moment(item.Dates).format('D')}</Text>
                          </View>
                          </TouchableOpacity>
                          </View>
        )}
          
        </View>
        <View style={styles.cRow}>
          <Image source={AppImages.Present_icon}
            style={styles.img} /><Text style={styles.txt1}>Present</Text>
          <Image source={AppImages.Absent_icon}
            style={styles.img} /><Text style={styles.txt1}>Absent</Text>
          <Image source={AppImages.Holiday_icon}
            style={styles.img} /><Text style={styles.txt1}>Holiday</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch',top:20 }}>
          <Text style={{ top: 18, left: 16, color: '#efbeab', fontSize: 16 }}>{
            (this.state.toggle ? (this.state.intime === "" || moment(this.state.toggle).format('ddd') === 'Sun'
              ? '' :
              this.state.toggle ? moment(this.state.intime).add('5.50', 'hours').format('hh:mm:ss a') : '') : ''
            )}</Text>
          <Text style={{ color: '#efbeab', top: 18, right: 15,fontSize:16 }}
          >{(this.state.toggle ? (this.state.outtime === "" || moment(this.state.toggle).format('ddd') === 'Sun'
            ? '' :
            this.state.toggle ? moment(this.state.outtime).add('5.50', 'hours').format('hh:mm:ss a') : '') : ''
          )}</Text></View>
        <View style={{
          flexDirection: 'row', top: 41, justifyContent: 'space-between',
          alignItems: 'stretch',
        }}>
          <Image source={AppImages.DowngreenArrow_icon}
            style={{ width: 12, height: 12, left: 20 }} />
          <Image source={AppImages.UpredArrow_icon}
            style={{ width: 12, height: 12, right: 22 }} />
          {/* {this.state.isProcessing && <UIActivityIndicator color="black"size={60} style={{top:height*0.33,right:'30%',alignSelf:'center'}}/>} */}
          <Dialog
            height={height * 0.099}
            width={width * 0.215}
            visible={this.state.visible}>
            <DialogContent>

              <View style={{ top: height * 0.0449 }}>
                {
                  this.state.isProcessing &&

                  <UIActivityIndicator color='black' size={height * 0.060} />

                }</View>
            </DialogContent>
          </Dialog>
        </View>
        <View style={styles.centerview}>
        
         <View style={{ flexDirection: 'row' }}>
            {this.state.toggle ?
              <ImageBackground source={this.state.src}
                style={{ width: 240, height: 240 }}>
                <View style={styles.hoursview}>
                  <Text style={{
                    color: moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && this.state.sts !== 2 ? '#69caf7' : 'white',
                    top: moment(this.state.toggle).format('ddd') === 'Sun' ? 22 : 5, fontSize: moment(this.state.toggle).format('ddd') === 'Sun' ? 31 : 16
                  }}>{moment().format('YYYY-MM-DD') >= moment(this.state.toggle).format('YYYY-MM-DD')
                    && moment(this.state.toggle).format('ddd') !== 'Sun' ? 'TOTAL HOURS' : moment(this.state.toggle).format('ddd') === 'Sun' ? <Text
                      style={{ marginVertical: 100 }}>SUNDAY</Text> : ''}</Text>
                  <Text style={{
                    top: 8, fontSize: 37, color: moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && this.state.sts == 1 ? 'black' : 'white', fontFamily: moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ?
                      'Roboto-Light' : 'Roboto-Thin'
                  }}>{
                      this.state.toggle ? moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && (this.state.intime !== '' && this.state.sts === 1) ?
                        moment(moment().subtract('19800', 'seconds') - moment(this.state.intime)).utc().format("H:m:s") : (this.state.outtime === "" ? '' : moment(moment(this.state.outtime) -
                          moment(this.state.intime)).utc().format('H:m:s')) : ''}</Text></View>
                <View style={{ top: -22, leftt: 0, position: 'absolute', alignSelf: 'center' }}>
                  <Progress.Circle
                    style={{
                      marginTop: 0, transform: [{ rotate: '180deg' }],
                      // left:-20
                    }}
                    progress={this.state.toggle ? moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && (this.state.intime !== '' && this.state.sts === 1) ?
                      Math.abs(y - x) / 32400 === '' ? 0 : Math.abs(y - x) / 32400 : (this.state.outtime === "" ? 0 : moment(moment(this.state.outtime) -
                        moment(this.state.intime)).utc().format('H') * 60 * 60 + moment(moment(this.state.outtime) -
                          moment(this.state.intime)).utc().format('m') * 60 + moment(moment(this.state.outtime) -
                            moment(this.state.intime)).utc().format('H')) / 324000 : 0}
                    //             
                    //indeterminate={this.state.indeterminate}
                    size={290}
                    borderWidth={0}
                    //showsText={true}
                    color={moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && this.state.sts === 1 ? '#69caf7' : 'black'}
                    //endAngle={2*3.14}
                    //formatText(progressValue)={'red'}
                    textStyle={{ transform: [{ rotate: '180deg' }], top: -130, fontSize: 20, }}
                  >
                  </Progress.Circle>
                </View>
              </ImageBackground> : <Text></Text>}
          </View>

          <View style={styles.circles}>


            <View style={{ flexDirection: 'row', top: 60, }}>
              {moment(this.state.toggle).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') || moment(this.state.toggle).format('ddd') === 'Sun' ?
                <View style={{ alignItems: 'center', top: 20 }}><Text style={{ color: 'white' }}>{moment(this.state.toggle).format('YYYY-MM-DD')} {this.state.data.CurrentMonth}</Text>
                  <Text style={{ top: 15, color: 'white', fontSize: 24, fontFamily: 'Roboto-Regular' }}>{moment(this.state.toggle).format('YYYY')}</Text>
                  {moment(this.state.toggle).format('ddd') === 'Sun' ? <View style={{ top: 45, width: 45, height: 45, }} /> :
                    <View style={styles.smallCircle}>
                      <Text style={styles.textPercentage}>{this.state.toggle ? 0 : ''}
                        <Text>%</Text></Text>
                    </View>}
                </View>
                :
                moment(this.state.toggle).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ?
                  <View>{this.state.sts !== 2 ?
                    <View style={{ alignItems: 'center', top: 20 }}>
                      <Text style={{ fontSize: 12, color: 'white' }} onPress={this.startStopStopWatch}>Please press here</Text>
                      <Text style={{ fontSize: 16, color: 'white', top: 8 }} onPress={this.startStopStopWatch}>{this.state.sts === 1 ? 'PUNCH OUT' : 'PUNCH IN'}</Text>
                      <View style={styles.smallCircle}>
                        <Text style={styles.textPercentage}>{this.state.sts === 1 ? Math.abs(parseInt((y - x) / 32400 * 100)) : 0}
                          <Text>%</Text></Text>
                      </View>
                    </View>
                    :
                    <View style={{ top: 20, alignItems: 'center' }}><Text style={{ color: 'white' }}>{moment(this.state.toggle).format('YYYY-MM-DD')} {this.state.data.CurrentMonth}</Text>
                      <Text style={{ top: 15, color: 'white', fontSize: 16 }}>{moment(this.state.toggle).format('dddd').toUpperCase()}</Text>
                      <View style={styles.smallCircle}>
                        <Text style={styles.textPercentage}>{
                          this.state.toggle ? (this.state.outtime === "" ? '0' : Math.round(((moment(this.state.outtime) -
                            moment(this.state.intime)) / 32400000) * 100) > 100 ? '100' :
                            Math.round(((moment(this.state.outtime) -
                              moment(this.state.intime)) / 32400000) * 100)) : ''
                        }<Text>%</Text></Text></View>
                    </View>}</View>
                  :
                  <View style={{ alignItems: 'center', top: 18 }}><Text style={{ color: 'white' }}>{moment(this.state.toggle).format('YYYY-MM-DD')} {this.state.data.CurrentMonth}</Text>
                    <Text style={{ top: 15, color: 'white', fontSize: 16 }}>{moment(this.state.toggle).format('dddd').toUpperCase()}</Text>
                    <View style={styles.smallCircle}>
                      <Text style={styles.textPercentage}>{
                        this.state.toggle ? (this.state.outtime === "" ? '0' : Math.round(((moment(this.state.outtime) -
                          moment(this.state.intime)) / 32400000) * 100) > 100 ? '100' :
                          Math.round(((moment(this.state.outtime) -
                            moment(this.state.intime)) / 32400000) * 100)) : ''
                      }<Text>%</Text></Text></View></View>}
            </View>
          </View>
        </View>
        <Dialog
          visible={this.state.showAlert}
          onTouchOutside={() => this.setState({ showAlert: true })}>

          <DialogContent>
            <View style={{ padding: 5 }}>
              <View style={{ width: 270 }}>
                <Text style={{ textAlign: 'center', margin: 10 }}>{this.state.data1.Message}</Text>
              </View>
              <TouchableOpacity onPress={this.hideAlert}>
                <View style={{
                  alignSelf: 'center', top: 10, backgroundColor: '#DD6B55',
                  paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10
                }}>
                  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>OK</Text>
                </View></TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog
          visible={this.state.sure}
        //onTouchOutside={() => this.setState({sure:true})}
        >

          <DialogContent>
            <View style={{ padding: 5 }}>
              <View style={{ width: 270 }}>
                <Text style={{ textAlign: 'center', margin: 10 }}>Are you Sure you want to Punchout?</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity onPress={this.hideAlert}>
                  <View style={{
                    alignSelf: 'center', top: 10, backgroundColor: 'grey',
                    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10
                  }}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>CANCEL</Text>
                  </View></TouchableOpacity>
                <TouchableOpacity onPress={() => this._hide('punch')}>
                  <View style={{
                    alignSelf: 'center', top: 10, backgroundColor: '#DD6B55',
                    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10
                  }}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>OK</Text>
                  </View></TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  cRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 27,
    left:4

  },
  cRow1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  txt: {
    fontSize: 16,
   // marginLeft: width * 0.016,
    alignSelf: 'center',
    //right: 2,
    fontFamily: 'Roboto-Regular'
  },
  txt2: {
    fontSize: 16,
    //marginLeft: width * 0.04,
    //top: 2,
    //right: 3,
  },
  img: {
    width: 12,
    height: 12,
  },
  txt1: {
    fontSize: 14,
    left: -25,
    bottom: 3
  },
  circles: {
    position: 'absolute',
  },
  hoursview: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 48
  },
  weekday_bg:{
   width: 41, 
   height: 22, 
   alignSelf: 'center', 
   position: 'absolute',
  },
centerview:{
  flexDirection: 'column', justifyContent: 'center',
  width: '100%', height: '100%', alignItems: 'center',
  alignContent: 'center', bottom: height * 0.10,
},
smallCircle:{
  width: 46, height: 46, 
  borderRadius: 23, borderColor: '#00bfff',
  backgroundColor: 'white', top: 45, borderWidth: 1,
  alignItems: 'center', justifyContent: 'center'
},
textPercentage:{
  textAlign: 'center', fontSize: 16, fontFamily: 'Roboto-Condensed'
}  

});
