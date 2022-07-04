import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Text, TouchableOpacity,  TextInput,ScrollView, Image } from 'react-native';
//import all the components we are going to use.
import { Card } from 'react-native-paper'
import AppImages from '../../utils/AppImages';
import Backbutton from '../../components/Backbutton';
export default class SecondPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Rewards',
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
                const backPage = navigation.getParam('backPage', 'Myaccount');
                navigation.navigate(backPage);
            }}
        />
    )
});
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.text1} >Select Collegue(S) for appreciation</Text>
        <TextInput placeholder="Search employee..." style={styles.searchbox}></TextInput>
        {/*<Image source={require('./img/search.png')} style={styles.searchicon} ></Image>*/}
        <Text style={styles.text2} >Collegue selected for appreciation</Text>
        <ScrollView>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Chinar Bhandari</Text>
            <Text style={styles.cartText2} >1 | Android</Text>
          </Card></TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Amit kamble</Text>
            <Text style={styles.cartText2} >2 | Android</Text>
          </Card></TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Kalindi shrike</Text>
            <Text style={styles.cartText2} >3 | Android</Text>
          </Card></TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Akash Gavali</Text>
            <Text style={styles.cartText2} >4 | Android</Text>
          </Card></TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Sid</Text>
            <Text style={styles.cartText2} >5 | Android</Text>
          </Card></TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rewards1');
            
          }}><Card style={styles.card}>
            <Image source={AppImages.myProfile_icon} style={styles.cardimg} ></Image>
            <Text style={styles.cartText1} >Jkeria</Text>
            <Text style={styles.cartText2} >6 | Android</Text>
          </Card></TouchableOpacity>
        </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 17,
  },
  searchbox: {
    margin: 10,
    padding:15,
    borderColor: 'black',
    borderWidth: 0.3,
    backgroundColor: 'white',
    height: 50
  },
  searchicon: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginTop: 92,
    marginLeft: 370
  },
  text2: {
    alignSelf: 'center',
    fontSize: 17,
  },
  card: {
    height: 110,
    margin:10,
    shadowRadius:10,
    borderRadius:10
  
  },
  cardimg: {
    height: 75,
    width: 75,
    marginTop: 20,
    marginLeft: 10
  },
  cartText1: {
    color: 'red',
    fontSize: 19,
    marginLeft: 95,
    marginTop: 30,
    position: 'absolute'
  },
  cartText2: {
    color: 'silver',
    fontSize: 19,
    marginLeft: 100,
    marginTop: 60,
    position: 'absolute'
  },

});