import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Image,TouchableOpacity,Dimensions} from 'react-native';
//import all the components we are going to use.
import Backbutton from '../../components/Backbutton';
const {height,width}=Dimensions.get('window')
 
export default class RaiseTicket extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My concerns',
        headerTitleStyle: { 
          textAlign:"center", 
          //color:'red',
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',
          headerLayoutPreset: 'center'
      },
        headerRight: (<View />),
        headerLeft: (
            <Backbutton
                onPress={() => {
                    const backPage = navigation.getParam('backPage', 'Home');
                    navigation.navigate(backPage);
                }}
            />
        )
    });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
     <View style={styles.container1}>
       <View style={styles.imgView}>
  <TouchableOpacity onPress={()=>navigate('Ticket')} >
    <Image source={require('../../assets/images/add.png')} onPress={()=>navigate('Ticket')}  style={styles.custButtonAdd}/>
    </TouchableOpacity>
    </View>
    </View>
</View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#d9dbdb',
  },
  container1: {
    flex:1,
    flexDirection:"column",
    justifyContent:'flex-end',
    bottom:50
    
    },
    custButtonAdd:{
      height:70,
      width:70, 
  },
  imgView:{
    // top:height*0.016,
    // right:'2%',
flexDirection:'column-reverse',
alignItems:"flex-end",

  }
});