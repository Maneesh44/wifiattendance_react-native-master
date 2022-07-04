import React, { Component } from 'react'
import ApiConfig from '../../api/ApiConfig'
import { postWithAuthCall } from '../../api/ApiServices'
import { StyleSheet, View, Text, FlatList, Image, ScrollView,Platform,Dimensions,
   TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Backbutton from '../../components/Backbutton';
import moment from 'moment';
import {UIActivityIndicator} from 'react-native-indicators';
import Summary from '../PunchDetails/Summary';
const { width, height } = Dimensions.get('window');
import Dialog, {DialogContent} from 'react-native-popup-dialog';
export default class Deductions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      data: {},
      isProcessing:true,
      visible:true
    }
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'Salary Deduction',
    headerTitleStyle: {
      textAlign: "center",
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      headerLayoutPreset: 'center'
    },
    
    headerRight: (<View />),
    headerLeft: (
      <Backbutton
        onPress={() => {
          const backPage = navigation.getParam('backPage', 'Myaccount');
          navigation.navigate(backPage);
        }}
      />
    )
  });
 componentDidMount() {
   this.showUserDetails();
  }
  
 showUserDetails() {
    let requsetBody = JSON.stringify({
      Month:moment(this.state.date).format('MM'),
      Year:moment(this.state.date).format('YYYY')
    });
 
     postWithAuthCall(ApiConfig.DEDUCTION, requsetBody)
      .then((data) => {
        if (data.Month) {
          this.setState({ data:data,isProcessing:false,visible:false});
        }
      }).catch((error) => {
        console.log("Used api response", error);
      });
  }
  monthDec()  {
    this.setState({ date:moment(this.state.date).subtract(1, 'months'),
    isProcessing:true,
    visible:true});
    this.showUserDetails();
  }
  monthInc() {
    this.setState({ date:moment(this.state.date).add(1, 'months'),
    isProcessing:true,
    visible:true});
    this.showUserDetails();
  }
  render() {
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
                     <ScrollView>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={styles.img1} >
              <Text style={styles.circleTime1}>{this.state.data.WorkedHours}</Text>
              <Text style={styles.circleText1}>Worked Hours</Text></View>
            <View style={styles.img2} >
              <Text style={styles.circleTime2}>{this.state.data.WorkingHours}</Text>
              <Text style={styles.circleText2}>Total Hours</Text></View></View>
          <View style={{ alignSelf: 'center' }}>
            <View style={styles.img3} >
              <Text style={styles.circleTime3}>{this.state.data.Deduction}</Text>
              <Text style={styles.circleText3}>Deductions</Text>
            </View>
          </View>
          <View style={styles.monthView}>
            <TouchableOpacity onPress={() =>  this.monthDec()}>
              <Image source={require('../../assets/images/left-arrow.png')} 
              style={styles.leftArrow} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, top: 5 }}>{moment(this.state.date).format('MMM YYYY')}
            </Text>
            <TouchableOpacity onPress={() => this.monthInc()} >
              <Image source={require('../../assets/images/right-arrow.png')}
               style={styles.rightArrow} />
            </TouchableOpacity>
          </View>
          <Text style={styles.dedct} >Deductions List</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View>
              <Card style={styles.cart1}  >
                <Text style={{ alignSelf:'center',fontSize: 12,fontWeight:'400',marginTop: 2 }}>
                  Unplanned Leaves</Text>
                <FlatList
                  data={this.state.data.UnplannedLeaves}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.doticon}></View>
                      <Text style={styles.flatLtext} >{item}</Text>
                    </View>
                  )}
                />
              </Card></View>
            <View>
              <Card style={styles.cart1}  >
                <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: '400', marginTop: 2 }}>
                  Late Punch In</Text>
                <FlatList
                  data={this.state.data.LatePunchIn}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.doticon}></View>
                      <Text style={styles.flatLtext} >{item}</Text>
                    </View>
                  )}
                />
              </Card></View>
            <View>
              <Card style={styles.cart1}  >
                <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: '400', marginTop: 2 }}>
                  Early Punch Out</Text>
                <FlatList
                  data={this.state.data.EarlyOuts}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.doticon}></View>
                      <Text style={styles.flatLtext} >{item}</Text>
                    </View>
                  )}
                />
              </Card></View>
          </View>
        </ScrollView>

      
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width
  },
  img1: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: '10%',
    backgroundColor: '#008ECC'
  },
  img2: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: '10%',
    marginLeft: width * 0.07,
    backgroundColor: '#4CBB17'
  },
  img3: {
    height: 100,
    width: 100,
    borderRadius: 75,
    alignSelf: 'center',
    backgroundColor: '#ff8c00'
  },

  dedct: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: width * 0.03,
    marginTop: height * 0.01
  },
  cart1: {
    width: 115,
    margin: 5,
    backgroundColor: '#edf1f2',
  },
  flatLtext: {
    fontSize: 10,
    marginLeft: 25,
    marginTop: 11,
    color: 'grey',
    margin: 5
  },
  doticon: {
    height: 6,
    width: 6,
    marginLeft: 10,
    margin: 15,
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 4
  },
  circleText1: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    top: 40,
    fontWeight: '400'
  },

  circleTime1: {
    color: 'white',
    alignSelf: 'center',
    top: 35,
    fontSize: 30,
    fontWeight: '400'
  },

  circleText2: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    top: 40,
    fontWeight: '400'
  },

  circleTime2: {
    color: 'white',
    alignSelf: 'center',
    top: 35,
    fontSize: 30,
    fontWeight: '400'
  },

  circleText3: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    top: 20,
    fontWeight: '400'
  },

  circleTime3: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    top: 15,
    fontWeight: '400'
  },
  leftArrow: {
    height: 30,
    width: 40,
  },
  rightArrow: {
    height: 30,
    width: 40,
  },
  monthView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: height * 0.02
  },

});