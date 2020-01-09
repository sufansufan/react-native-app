import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge, Modal, Provider } from '@ant-design/react-native';
import Title from './components/Title'
import TabBar from './components/Tabs'
import NavBar from "../components/NavBar";
import { upgrade, pushDeviceToken } from "../../utils/api/home/index";
import JPushModule from 'jpush-react-native'

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 3,
      registerID: ''
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
    let version = await AsyncStorage.getItem('version')
    const { navigation } = this.props
    if(value === null) {
      navigation.replace('Login')
      return
    }
    upgrade().then(res => {
      if(res.version !== JSON.parse(version)){
        this.onModalClick(res)
      }
    })
    this.messagePush()
  }
  onModalClick = (data) => {
    Modal.alert('版本更新', `${data.content}`, [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      { text: '确定', onPress: () => {
        Linking.openURL(data.link)
      } },
    ]);
  }
  messagePush = () => {
    if (Platform.OS === 'android') {
      JPushModule.init()
    }else if(Platform.OS === 'ios'){
      JPushModule.loadJS()
    }
    if(Platform.OS === 'android') {
      JPushModule.getRegistrationID(map => {
        this.setState({
          registerID : map.registerID,
        })
        pushDeviceToken({device_token: map.registerID})
      })
    }else {
      JPushModule.getRegisterId(map => {
        this.setState({
          registerID : map.registerID,
        })
        pushDeviceToken({device_token: map.registerID})
      })
    }

  }
  render() {
    return (
      <Provider>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <NavBar {...this.props} hideLeft={true} hideRight={true} title='首页'></NavBar>
            <View style={{backgroundColor: '#fff'}}>
              <Title></Title>
            </View>
            <TabBar {...this.props}></TabBar>
          </View>
        </SafeAreaView>
      </Provider>
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
