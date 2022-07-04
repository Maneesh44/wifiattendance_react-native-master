import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet,Dimensions,View} from 'react-native';
//import all the components we are going to use.
 import Backbutton from '../../components/Backbutton';
import WebView from 'react-native-webview'
import {UIActivityIndicator} from 'react-native-indicators';
import Dialog,{DialogContent} from 'react-native-popup-dialog';
const{height,width}=Dimensions.get('window')
export default class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: true,
      visible:true
    };
  }
  hideSpinner() {
    this.setState({ isProcessing:false,visible: false });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'About Us',
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

       <WebView source={{ uri:'https://www.redbytes.in/about-us/'}}
       onLoad={() => this.hideSpinner()} >
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

       </WebView>
    );
  }
}
const styles = StyleSheet.create({
  
});
