import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View,SafeAreaView,PixelRatio, AppRegistry,Text,Image,Platform,ScrollView,Dimensions } from 'react-native';
//import all the components we are going to use.
import { TextInput }from 'react-native-paper'
import Backbutton from '../../components/Backbutton';
import { simpleGetCall,updateProfile,multipartWithTokenPostCall} from '../../api/ApiServices';
import ApiConfig from '../../api/ApiConfig';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MapView,{PROVIDER_GOOGLE } from 'react-native-maps';
import LocationView from "react-native-location-view";
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('window');
export default class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      toggle:false,
      FatherName:'',
      MotherName:'',
      ImageSource:null,
      loading: true,
     check:false,
  //   region: {
  //   latitude:18.577248,
  //   longitude: 73.874428,
  //   latitudeDelta: 0.001,
  //   longitudeDelta: 0.001
  // }  
    }
  };
  componentDidMount(){
    this.getProfile();
  }
  static navigationOptions = ({ navigation }) => ({
    header: null , 
});
getProfile(){
simpleGetCall(ApiConfig.PROFILE)
.then((data) =>{
if(data.EmployeeId){
  this.setState({ data:data,FatherName:data.FatherName,MotherName:data.MotherName});
}

}).catch((error) => {
  console.log("getAllCards api response", error);
});
}
setProfile=()=>{
  const formData = new FormData();
  formData.append('FatherName', this.state.FatherName);
  formData.append('MotherName', this.state.MotherName);
  formData.append('PhotoLink',this.state.ImageSource);
  multipartWithTokenPostCall(ApiConfig.Update_Employee,formData)
    .then((data) => {
       Toast.show(data.Message);
    }).catch((error) => {
      console.log("Used api response", error);
    });
    this.setState({toggle:false})
}


selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = response.uri
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
 
            ImageSource: source
 
          });
        }
      });
    }
    _count=(id)=>{
      this.setState({check:id})
    }
  
  render() {
    console.log(this.state.ImageSource)
    return ( 
      <SafeAreaView style={{ flex:1}}>
       {
         this.state.check?
    //      <MapView
    //      provider={PROVIDER_GOOGLE}
    //      style={styles.map}
    //      initialRegion={this.state.region}
    //      showsUserLocation={true}
    //      onMapReady={this.onMapReady}
    //      onRegionChangeComplete={this.onRegionChange}>
    //    <MapView.Marker
    //      coordinate={{ "latitude": this.state.region.latitude,   
    //      "longitude": this.state.region.longitude }}
    //      title={"Your Location"}
    //      draggable />
    //  </MapView>
    <LocationView
    apiKey={"AIzaSyBKLMwSgpyPLp9xNDjt4tELwNGkAdR5qTA"}
    initialLocation={{
     latitude:18.576210,
     longitude: 73.876152,
     onChangeText(text){
       console.log(text)
     }
    }}
    //onLocationSelect={this.setState({adress:actionText})}
    markerColor={'red'}
  />:
      <View style={Platform.OS==='ios'?[styles.container,{top:-10}]:styles.container}>
        <View style={styles.header} >
        <View style={{left:-width * 0.055}}>
      <Backbutton 
          onPress={() => {
              this.props.navigation.navigate('Myaccount');
          }}
      /></View>
        
            <View style={{ top:8}}>{
            this.state.toggle==false?
            <TouchableOpacity onPress={()=>this.setState({toggle:true})} style={{left:width*0.6}}><Text  style={{fontSize: 20, color: 'red'}}>EDIT</Text></TouchableOpacity>: 
            <TouchableOpacity onPress={this.setProfile} style={{left:width*0.52}}><Text style={{fontSize: 20, color: 'red'}}>UPDATE</Text></TouchableOpacity>
            }</View> 
         
        </View>  

       
        <ScrollView> 
        { 
           this.state.toggle==false?
           <View>
        <View style={{ height:175,width:width,backgroundColor:'white'}}>
          <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <View style={styles.profileView}>
        <Image source={{uri:this.state.data.PhotoLink}} style={styles.profileImage}/>
        </View>
        <View style={{left:'35%'}}>
    <Text style={{ fontSize: 17, fontWeight: 'bold',margin:2 }}>{this.state.data.FirstName+" "+this.state.data.LastName}</Text>
    <Text style={{ fontSize: 13, fontWeight: '600',margin:2 }}>{this.state.data.MobileNo}</Text>
    <Text style={styles.Text1}>Employee id:<Text style={styles.Text2}>{this.state.data.EmployeeCode}</Text></Text>
    <Text style={styles.Text1}>Designation:<Text style={styles.Text2}>{this.state.data.DesignationName}</Text></Text>
          <Text style={styles.Text1}>Department:<Text style={styles.Text2}>{this.state.data.DepartmentName}</Text></Text>
    <Text style={styles.Text1}>Blood Group:<Text style={styles.Text2}>{this.state.data.BloodGroup}</Text></Text>
    <Text style={styles.Text1}>DOB:<Text style={styles.Text2}>{this.state.data.DOB}</Text></Text>
          </View>
          </View>
        </View>        
      <View style={{justifyContent:'center',alignItems:'center',top:15}}>
        <View style={{ width:width*0.94, height: 400,backgroundColor:'white',borderRadius: 15 }} >
    <View style={styles.fentline}><Text style={styles.DetailsText}>{this.state.data.FatherName}</Text></View>
    <View style={styles.fentline}><Text style={styles.DetailsText}>{this.state.data.MotherName}</Text></View>
          <View style={styles.fentline}><Text style={styles.DetailsText}>{this.state.data.MobileNo}</Text></View>
          <View style={styles.fentline}><Text style={styles.DetailsText}>{this.state.data.EmergencyContact}</Text></View>
          <View style={styles.fentline1}><Text style={styles.DetailsText}>{this.state.data.Address}</Text></View>
          <View style={styles.fentline1}><Text style={styles.DetailsText}>{this.state.data.PermanentAddress}</Text></View>
        </View>
        </View>
        </View>
        :
        <View>
        <View style={{ height:175,width:width,backgroundColor:'white'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
      <View style={styles.profileView}>
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <Image source={{uri:this.state.data.PhotoLink}} style={styles.profileImage}/>
        <Image source={require('../../assets/images/edit.png')} style={styles.editImg}/>
        </TouchableOpacity> 
      </View>
      <View style={{left:'35%'}}>
  <Text style={{ fontSize: 17, fontWeight: 'bold',margin:2 }}>{this.state.data.FirstName+" "+this.state.data.LastName}</Text>
  <Text style={{ fontSize: 13, fontWeight: '600',margin:2 }}>{this.state.data.MobileNo}</Text>
  <Text style={styles.Text1}>Employee id:<Text style={styles.Text2}>{this.state.data.EmployeeCode}</Text></Text>
  <Text style={styles.Text1}>Designation:<Text style={styles.Text2}>{this.state.data.DesignationName}</Text></Text>
        <Text style={styles.Text1}>Department:<Text style={styles.Text2}>{this.state.data.DepartmentName}</Text></Text>
  <Text style={styles.Text1}>Blood Group:<Text style={styles.Text2}>{this.state.data.BloodGroup}</Text></Text>
  <Text style={styles.Text1}>DOB:<Text style={styles.Text2}>{this.state.data.DOB}</Text></Text>
        </View>
        </View>
      </View> 
          <View style={{justifyContent:'center',alignItems:'center',top:15}}>
          <View style={{ width:width*0.94, height: 400,backgroundColor:'white',borderRadius: 15 }} >
          <View style={styles.fentline2}>
             <TextInput style={styles.DetailsText1} 
             placeholder="Father Name"
             value={this.state.FatherName}
          onChangeText={(value) => this.setState({FatherName:value})}/>
                  </View>
          <View style={styles.fentline2}>
            <TextInput style={styles.DetailsText1} 
             placeholder="Mother Name"
            value={this.state.MotherName}
              onChangeText={(value) => this.setState({MotherName:value})}/>
              </View>
              <View style={styles.fentline2}>
                <TextInput style={styles.DetailsText1} 
                 placeholder="Mobile No">
                   {this.state.data.MobileNo}
                 </TextInput>
              </View>
              <View style={styles.fentline2}>
                <TextInput style={styles.DetailsText1} 
                 placeholder="Emergency Contact">
                   {this.state.data.EmergencyContact}
                   </TextInput>
              </View>
          <View style={styles.fentline1}>
            <Text onPress={()=>this._count('id')} style={styles.DetailsText}>
              {this.state.data.Address}
            </Text>
            </View>
          <View style={styles.fentline1}>
            <Text onPress={()=>this._count('id')}  style={styles.DetailsText}>
              {this.state.data.PermanentAddress}
            </Text>
            </View>
          </View>
          </View>
        </View>
        }
        </ScrollView>
        </View>
      }
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeef2',
  },
  DetailsText: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400'
  },
  DetailsText1: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '400',
    backgroundColor:'white',
    height:height*0.025,
  },
  imgpro: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 100,
    marginLeft: 20,
    position: 'absolute'
  },
  profileView: {
      left:'20%',
      top:Platform.OS==='ios'?'5%':'10%'
  },
  profileImage: {
    height: 115,
    width: 115,
    borderRadius:80
  },
  map:{
flex:1
  },
  top: {
    ...Platform.select({
      android: { height: 0 },
      ios: { height: 35 }
    })
  },
  edit:{
    color:'red',
    fontSize:20,
    textAlign:'center',
    left:-15
  },
  header: {
    height: height * 0.060,
    width:width,
   flexDirection: 'row',
  textAlign:'center',
    backgroundColor: 'white',
    ...Platform.select({
      android: {
      },
      ios: {
      }
    })
  },
  editImg:{
  height:height*0.035,
  width:width*0.075,
  top:-30,
 alignSelf:"flex-end"
  },
  Text1: { fontSize: 14, fontWeight:'200',margin:2},
  Text2: { fontSize: 14,fontWeight:'bold'},
  fentline: { width: width*0.8, margin: 20, borderBottomWidth: 0.2,borderBottomColor:'black' },
  fentline1: { width: width*0.8, margin: 20, borderBottomWidth: 0.2,borderBottomColor:'black' },
  fentline2: { width: width*0.8, margin: 20, borderBottomWidth: 0.2,borderBottomColor:'black' },
});