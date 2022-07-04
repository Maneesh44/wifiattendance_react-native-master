import React, { Component } from 'react';
import {
StyleSheet,
 View,
Text,
Image,
TouchableOpacity,Dimensions,TouchableHighlight,
Button
} from 'react-native';
import AppImages from '../../utils/AppImages';
import Backbutton from '../../components/Backbutton';
const colors = [
    'green', 'black', 'black', 'black', 'black', 'black', 'green',
  ]
import { Card} from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
const {width,height}=Dimensions.get('window');


export default class Rewards1  extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle:true,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Rewards',
        headerRight: (<View />),
        headerLeft: (
            <Backbutton
                onPress={() => {
                    const backPage = navigation.getParam('backPage', 'Rewards');
                    navigation.navigate(backPage);
                }}
            />
        )
    }); 
  render() {
    return (
<View style={styles.container}>
    <Card style={styles.card}>
        <Text style={{alignSelf:'center',fontSize:16,marginTop:10}}>Colleague selected for appriciation</Text>
    <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
    <Text style={styles.cartText1} >Reetu Singh</Text>
    <Text style={styles.cartText2} >RB 45 | Android</Text>
    </Card> 
    <Text style={styles.text1} >select Colleague(S) qualities</Text>
    <View style={{alignSelf:'center'}}>
    <View style={{flexDirection:'row'}}>
    <Card style={styles.cartsmall1}>    

    <TouchableOpacity
    ><Text style={styles.textInbox}>Confidence</Text>  
      </TouchableOpacity>
   </Card>
    <Card style={styles.cartsmall2}>
    <TouchableOpacity><Text style={styles.textInbox}> Integrity </Text></TouchableOpacity>
   </Card>
    <Card style={styles.cartsmall3}>
    <TouchableOpacity><Text style={styles.textInbox}> Patience </Text></TouchableOpacity>
   </Card>
   </View>
   <View style={{flexDirection:'row'}}>
    <Card style={styles.cartsmall4}>
    <TouchableOpacity><Text style={styles.textInbox}> Passion </Text></TouchableOpacity>
   </Card>
   <Card style={styles.cartsmall5}>
   <TouchableOpacity><Text style={styles.textInbox}> Confidence </Text></TouchableOpacity>
   </Card>
   <Card style={styles.cartsmall6}>
   <TouchableOpacity><Text style={styles.textInbox}> Integrity </Text></TouchableOpacity>
   </Card></View>
   <View style={{flexDirection:'row'}}>
   <Card style={styles.cartsmall7}>
   <TouchableOpacity><Text style={styles.textInbox}> Patience </Text></TouchableOpacity>
   </Card>
   <Card style={styles.cartsmall8}>
   <TouchableOpacity><Text style={styles.textInbox} >Inspiration</Text></TouchableOpacity>
   </Card>
   <Card style={styles.cartsmall9}>
   <TouchableOpacity><Text style={styles.textInbox} >Passion</Text></TouchableOpacity>
   </Card></View>
   </View>
   <TouchableOpacity>
   <View View style={styles.check} ></View>
   </TouchableOpacity>
    <Text style={styles.selproText} >Select Project</Text>
    <ModalDropdown style={{alignSelf:'center',height:45,width:width*0.95,borderWidth:0.5,marginTop:10}}
    dropdownStyle={{alignSelf:'center',height:120,width:width*0.95,borderWidth:1}}
    dropdownTextStyle={{fontSize:20,fontWeight:'500'}}
    textStyle={{fontSize:18,alignSelf:'center',padding:10}}
    options={['Sahardaya', 'messpizza','No app','Talent','whatzzz']}/>
   
       <View style={styles.submitB}>
       <TouchableOpacity>
         <Text style={styles.submitT}>SUBMIT</Text>
        </TouchableOpacity>
    </View>
</View>
);
}
}
const styles =StyleSheet.create({
    container:{
        flex:1
        },
    card:{
        height:135,
        margin:10,
        shadowRadius:2,
     
},
    text1:{
        fontSize:15,
        fontWeight:'200',
        alignSelf:'center'
        },
    cardimg:{
        height:80,
        width:80,
        marginTop:8,
        marginLeft:10
        },
    cartText1:{
        color:'red',
        fontSize:19,
        marginLeft:100,
        marginTop:55,
        position:'absolute'
        },
    cartText2:{
        
        fontSize:18,
        marginLeft:100,
        marginTop:75,
        position:'absolute'
    },
    cartsmall1:{
        margin:15,
        height:70,
        width:90,
        shadowRadius:3,  
    },
    cartsmall2:{
        margin:15,
        height:70,
        width:90,
        shadowRadius:3,
    },
    cartsmall3:{
        margin:15,
        height:70,
        width:90,
        shadowRadius:3,
       },
    cartsmall4:{
        margin:15,
        height:70,
        width:90,
        shadowRadius:3,   
        },
    cartsmall5:{
        height:70,
        width:90,
        shadowRadius:3,  
        margin:15,
    },
    cartsmall6:{
        height:70,
        width:90,
        shadowRadius:3, 
         margin:15,
    },
    
   
    cartsmall7:{
        height:70,
        width:90,
        shadowRadius:3, 
         margin:15,
    },
    cartsmall8:{

        height:70,
        width:90, 
         margin:15,
        shadowRadius:3,},
    cartsmall9:{
        height:70,
        width:90, 
         margin:15,
        shadowRadius:3,
    },
    textInbox:{
         fontSize:14,
         alignSelf:'center',
         marginTop:22,
         color:'black'
    },
    
    check:{
         borderWidth:1,height:18,
         width:18,marginLeft:15,
        top:'19%'
        },
    selproText:{
     left:40,
      top:'-2.2%',
        fontSize:15
        },
    dropcard:{
        height:40,
        margin:15,
        borderWidth:1
        },
    submitB:{
        borderRadius:15,
        backgroundColor:'#b80606',
        height:50,
        width:150,
        top:'15%',
        alignSelf:'center'
        },
    submitT:{
        fontSize:15,
        color:'white',
        alignSelf:'center',
        padding:14,
        fontWeight:'500'
    },
});