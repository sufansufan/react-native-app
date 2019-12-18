import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge } from '@ant-design/react-native';
import Title from './components/Title'
import TabBar from './components/Tabs'
import NavBar from "../components/NavBar";

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 3
    }
  }

  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => {
      // focused ? <Image style={styles.tabBarIcon} source={require('../../images/main_action.png')} /> : <Image style={styles.tabBarIcon} source={require('../../images/main.png')} />
      let icon = focused ?
      require('../../images/main_action.png'):
      require('../../images/main.png');
      return (
        <View>
          <View style={{
              width:12,
              height:12,
              justifyContent:"center",
              position: 'absolute',
              zIndex: 9,
              backgroundColor: "#FB3768",
              borderRadius:6,
              right:-8,
              top:-4,
          }}>
              <Text style={[{fontSize:10, color:"#fff", textAlign:"center",}]}>3</Text>
        </View>
          <Image source={icon} style={styles.tabBarIcon}/>
      </View>
      )
    }

  };
  async componentDidMount() {
    let value = await AsyncStorage.getItem('userInfo')
    const { navigation } = this.props
    if(!value) {
      navigation.replace('Login')
    }
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <NavBar {...this.props} hideLeft={true} hideRight={true} title='首页'></NavBar>
          <View style={{paddingBottom: 10, paddingTop: 10, backgroundColor: '#fff'}}>
            <Title></Title>
          </View>
          <TabBar {...this.props}></TabBar>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  tabBarIcon: {
    width: 21,
    height: 21,
  }
});
