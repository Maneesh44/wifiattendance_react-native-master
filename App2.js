import React from "react";
import { StyleSheet, View,Text,TouchableOpacity,FlatList,ScrollView,Image} from 'react-native'
import moment from "moment";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { range } from "moment-range";
import AppImages from '../../utils/AppImages';

//import { ScrollView } from "react-native-gesture-handler";
//import "./calendar.css";
let monthss = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];
let mts=[];
export default class ApplyLeaveScreen extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    toggle:moment().format('MMMM')
  };
  _toggle= key =>{
    this.setState({toggle:key})
  }
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
      //console.log('f '+firstDay)
    return firstDay;
  };
  lastDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let lastDay = moment(dateObject)
      .endOf("month")
      .format("d"); // Day of week 0...1..5...6
      //console.log('ls '+(firstDay-6))
    return Math.abs(lastDay-6);
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
     showDateTable: !this.state.showDateTable
    });
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  MonthList = props => {
    let months = [];
    const containerstyle=[styles.base];
    const textstyle=[];
    props.data.map(data => {
      months.push(
        
        data
        
      );
      textstyle.push(styles.text)
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
     
        cells.push(row);
        //textstyle.push(styles.text);
     
    });
    rows.push(cells);
    //console.log(textstyle.length)
    let monthlist = rows.map((d, i) => {
    return <Text >{d}</Text>;
    });
console.log(this.state.toggle)
    return (
            <ScrollView contentContainerStyle={{flexDirection:'row',justifyContent:'space-between'}}>
      
            {/* <Text colSpan="4">Select a Month</Text> */}
            <FlatList
         horizontal
         data={months}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({ item, index }) =>
         <View>{this.month()===item?
           <Image source={AppImages.Select_Month}
        style={{width:80,height:35,position:'absolute',top:10,left:5}}/>:
        <View/>}
        <Text style={{padding:10,fontSize:16,margin:10}}  onPress={() => {
            this.setMonth(item),
            this._toggle(item);
          }}
        >{item.slice(0,3)}</Text>
        <View style={{width:1,height:43,backgroundColor:'grey',position:'absolute',top:7}}/>
        </View>}
        />
       </ScrollView>
    );
  };
  showYearTable = e => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <Text
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          {data}
        </Text>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <Text>{d}</Text>;
    });

    return (
      
          <View>
            <Text >Select a Yeah</Text>
          
        <Text>{yearlist}</Text>
      </View>
    );
  };
  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };
  render() {
    const containerstyle=[styles.base];
    const textstyle=[styles.text];
    let weekdayshortname = this.weekdayshort.map(day => {
      return <Text key={day} style={{padding:10,color:'red'}}>{day}</Text>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<Text  style={{padding:11,textAlign:'center',backgroundColor:'red',paddingVertical:10}} >{"    "}</Text>);
    }
    let blnk=[];
    for (let i = 0; i < this.lastDayOfMonth(); i++) {
      blnk.push(<Text  style={{padding:11,textAlign:'center',backgroundColor:'red',paddingVertical:10}} >{"    "}</Text>);
    }
    //console.log("dd "+blnk.length)
    let daysInMonth = [];
    let img=[];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
     if(d<10){
      daysInMonth.push(
          <Text
            onPress={e => {
              this.onDayClick(e, d);
            }}
            style={{padding:10.5,textAlign:'center',paddingVertical:10}}
          >{d}  </Text>
      );
      img.push(
        <Image source={AppImages.Select_Day}
        style={{width:34.5,height:34.5,padding:10,backgroundColor:'green',}}/>
      )
    }
      else{
        daysInMonth.push(
          <Text
            onPress={e => {
              this.onDayClick(e, d);
            }}
            style={{padding:10,textAlign:'center',paddingVertical:10}}
          >{d}</Text>
      );
          img.push(
            <Image source={AppImages.Select_Day}
            style={{width:34.5,height:34.5,padding:10,backgroundColor:'green',}}/>
          )
      }
      
    }
    var totalSlots = [...blanks, ...daysInMonth, ...blnk];
    var totalSlots1 = [...blanks, ...img, ...blnk];
    let rows = [];
    let cells = [];
    let rows1 = [];
    let cells1 = [];
   let ddd=[];
  totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });
    totalSlots1.forEach((row1, i) => {
      if (i % 7 !== 0) {
        cells1.push(row1);
      } else {
        rows1.push(cells1);
        cells1 = [];
        cells1.push(row1);
      }
      if (i === totalSlots1.length - 1) {
        // let insertRow = cells.slice();
        rows1.push(cells1);
      }
    });
    let rw=[];
    rw.push(rows1);
    rw.push(rows);
    ddd=rows.map(item=>({
      dte:item}));
     let dim=rows1.map(item=>({
        die:item}));
      let dw=rw.map((row, i) => ({
        //txt:row[0],
        im1:row[1],
        im2:row[2],
        im3:row[3],
        im4:row[4],
        im5:row[5],
        im6:row[6],
        }));
let pw=[{'txt':rw[0],'im':rw[1]}]
      let ar=[],k=0;
      for(let i=0;i<ddd.length;i++){
        for(let j=0;j<ddd[i].dte.length;j++){
          ar[k]=ddd[i].dte[j];
          k++;
        }
      }
    console.log(ddd.length)
    let daysinmonth = rows.map((d, i) => {
      return <Text>{d}</Text>;
    });
    //console.log(dw[1].im.length)
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <FlatList
         horizontal
         //scrollEnabled={false}
         data={ar}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({ item, index }) =>
            <View style={{top:190}}>
              <Text style={{padding:10}}>
              {item}</Text>
            </View>
        }       
         />
         <View style={{top:190}}>
         <this.MonthList data={moment.months()}  />
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                {weekdayshortname}
           </View>
           {dim.map(item=>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          {item.die}
          </View>)}
          
           <View style={{bottom:ddd.length>6?220:195}}>
         {ddd.map(item=>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>
          {item.dte}
          </View>)}</View>
          </View>
          {/* <Image source={AppImages.Select_Day}
          style={{width:10,height:10,padding:15,backgroundColor:'green'}}/> */}
          
          {img.map(item=>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',position:'absolute'}}>
          {img}
          </View>
          )}
          
          {/* <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',justifyContent:'space-evenly'}}>
            {ddd[0].dte}</View>
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',justifyContent:'space-evenly'}}>
            {ddd[1].dte}</View>
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',justifyContent:'space-evenly'}}>
            {ddd[2].dte}</View>
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',justifyContent:'space-evenly'}}>
            {ddd[3].dte}</View>
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',justifyContent:'space-evenly'}}>
            {ddd[4].dte}</View>
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'blue',left:20}}>
            {ddd[5].dte}</View> */}
        <View className="calendar-navi">
          <Text
            onClick={e => {
              this.onPrev();
            }}
            class="calendar-button button-prev"
          />
          {!this.state.showMonthTable && (
            <Text
              onClick={e => {
                this.showMonth();
              }}
              style={{padding:10,color:'red'}}
            >
              {this.month()}
            </Text>
          )}
          <Text className="calendar-label" onClick={e => this.showYearTable()}>
            {this.year()}
          </Text>
           <Text
          onClick={e => {
            this.onNext();
          }}
          className="calendar-button button-next"
        />
        </View>
       
        <View className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  base: {
    width: 32,
    height: 32,
    alignItems: 'center'
  },
  text: {
    marginTop:  4,
    fontSize: 16,
    //margin:20,
    marginRight:10,
    //fontFamily: ,
    fontWeight:'400',
    color: 'black',
    //backgroundColor: 'green',
    //lineHeight:20,
   //width:100,
   //height:100,
   padding:10,
   justifyContent:'space-around'
  },
})