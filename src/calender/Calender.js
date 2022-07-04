import React from "react";
import { StyleSheet, View,Text,TouchableOpacity,FlatList,ScrollView,Image,Dimensions} from 'react-native'
import moment from "moment";
import AppImages from '../utils/AppImages';
const { width, height } = Dimensions.get('window');
import PropTypes from 'prop-types';



export default class Calender extends React.Component {
  weekdayshort = moment.weekdaysShort();


  state = {
    showYearTable: false,
    showMonthTable: false,
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    selectedMonth:null,
    selectedYear:null,
    toggle:false,
    count:0,
    mts:[],
    selectm:[],
    isChecked:[],
    selectedLists:[]
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
      
    return firstDay;
  };
  lastDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let lastDay = moment(dateObject)
      .endOf("month")
      .format("d"); // Day of week 0...1..5...6
      
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
//console.log(this.state.toggle)
    return (
            <View style={{marginTop:2}}>
      
            <FlatList
         horizontal
         data={months}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({ item, index }) =>
         <View>{this.month()===item?
           <Image source={AppImages.Select_Month}
        style={{width:90,height:35,position:'absolute',top:12,left:5}}/>:
        <View/>}
        <Text style={{paddingVertical:10,paddingHorizontal:22,fontSize:16,margin:10,color:this.month()===item? 'white':'grey'}}  onPress={() => {
            this.setMonth(item)
          }}
        >{item.slice(0,3).toLocaleUpperCase()}</Text>
        <View style={{width:1,height:43,backgroundColor:'grey',position:'absolute',top:7}}/>
        </View>}
        />
        <View style={{width:width,height:1,backgroundColor:'grey'}}/>
       </View>
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
  selectItem = (item) => {
     // this.props.onPress(item);
    console.log("ppp "+item)
    let { isChecked,selectedLists} = this.state;
    
    isChecked[item] = !isChecked[item];
    this.setState({ isChecked : isChecked});
    
    if(isChecked[item] == true){
      selectedLists.push(item)
  }
      else {            
        selectedLists.pop(item)
       }
  console.log('fff ',selectedLists)
  };
  deleteArray = () => {

    this.setState({ count: 0,toggle:false })
    this.state.mts.splice(0, this.state.mts.length);
    this.state.isChecked.splice(0, this.state.isChecked.length);

  }

  onDayClick = (d) => {
   
    this.setState(
      {
        selectedDay: d,
        selectedMonth:this.month(),
        selectedYear:this.year(),
        toggle:true

      },
      () => {
        let x= this.state.selectedDay+"-"+this.state.selectedMonth+"-"+this.state.selectedYear
        let arr=[];
        let { mts,selectm} = this.state;
        arr.push(x);
        selectm.push(x)
       this.props._press(selectm,this.state.isChecked)
        var uniqueNames = this.getUnique(selectm);
        console.log(arr.length)
        console.log("SELECTED DAY: ",selectm);
        console.log("SELECTED arr: ",arr);
        this.setState({mts:selectm ,count:arr.length,})
      },
      
    );
  };
//   _press=()=>{
//       this.getUnique(this.state.mts)
//   }
   getUnique(array){

    // Loop through array values
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){
        if(array[i]===array[j]){
            array.splice(i,1);
            array.splice(array.length-1,1);
        }
    }
    }
    console.log('eee ',array);
    return array;
}
  render() {
   
    let weekdayshortname = this.weekdayshort.map(day => {
      return <Text key={day} style={{padding:10,}}>{day.toLocaleUpperCase()}</Text>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<Text  style={{paddingVertical:9,textAlign:'center',paddingHorizontal:18}} >{""}</Text>);
    }
    let blnk=[];
    for (let i = 0; i < this.lastDayOfMonth(); i++) {
      blnk.push(<Text  style={{paddingVertical:9,textAlign:'center',paddingHorizontal:18,marginTop:2}} >{""}</Text>);
    }
    
  
    let daysInMonth = [];
    let img=[];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "yellow" : "";
   
    // this.setState({mts:mts})
   // console.log(this.state.mts)
      if(d<10){
        if( d===parseInt(this.currentDay()) && this.month()===moment().format('MMMM')){
          daysInMonth.push(
            <Text
              onPress={() => {
                  this.props.dtClk(d,this.month(),this.year()),
                this.onDayClick(d),
                 this.selectItem(d)
  
              }}
              style={{paddingHorizontal:13.66,textAlign:'center',paddingVertical:8.9,marginTop:2,backgroundColor: 'yellow',borderRadius:18}}
            >{d}</Text>
        );
        }
        else{
      daysInMonth.push(
          <Text
            onPress={() => {
                this.props.dtClk(d,this.month(),this.year()),
              this.onDayClick(d),
               this.selectItem(d)

            }}
            style={{paddingHorizontal:13.66,textAlign:'center',paddingVertical:8.9,marginTop:2,borderRadius:18}}
          >{d}</Text>
      );}
     
     img.push(
      this.state.isChecked[d]===true && this.state.selectedMonth===this.month()?
     <Image source={AppImages.Select_Day}
     style={{width:20,height:20,padding:17,marginTop:2,}}/>:
      <View style={{width:20,height:20,padding:17,marginTop:2,}}/>
   )
  }
      else{
        if( d===parseInt(this.currentDay()) && this.month()===moment().format('MMMM')){

          daysInMonth.push(
            <Text
              onPress={() => {
                  this.props.dtClk(d,this.month(),this.year()),
                  this.onDayClick(d),
                   this.selectItem(d)
              }}
              style={{paddingHorizontal:10,textAlign:'center',paddingVertical:9,marginTop:2,backgroundColor:'yellow',borderRadius:18}}
            >{d}</Text>
        );
        }
        else{
        daysInMonth.push(
          <Text
            onPress={() => {
                this.props.dtClk(d,this.month(),this.year()),
                this.onDayClick(d),
                 this.selectItem(d)
            }}
            style={{paddingHorizontal:10,textAlign:'center',paddingVertical:9,marginTop:2}}
          >{d}</Text>
      );}
     // this.state.mts.push(d);
      //console.log(this.state.mts.length)
      
      img.push(
        this.state.isChecked[d]===true && this.state.selectedMonth===this.month()?
       <Image source={AppImages.Select_Day}
       style={{width:20,height:20,padding:17,marginTop:2,}}/>:
        <View style={{width:20,height:20,padding:17,marginTop:2,}}/>
     )
   }
      
    }
    //console.log("rrr "+img.length)
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
      
    console.log('is ',this.state.isChecked.length)
    const pad1 = [0,2,1.5,0,0,ddd.length<7?1.8:0,2];
    const pad2 = [0,-3,-1,0,0,ddd.length<7?3:5,10];
    let daysinmonth = rows.map((d, i) => {
      return <Text>{d}</Text>;
    });
    //console.log(dw[1].im.length)
    return (
      <View style={{flex:1,backgroundColor:'white',justifyContent:'center',}}>
        
         <View style={{}}>
         <this.MonthList data={moment.months()}  />
         <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                {weekdayshortname}
           </View>
           {dim.map((item,index)=>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',bottom:pad1[index % pad1.length] }}>
          {item.die}
          </View>)}
          
           <View style={{position:'absolute',top:95,width:width}}>
         {ddd.map((item,index)=>
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',bottom:pad2[index % pad2.length] }}>
          {item.dte}
          </View>)}</View>
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