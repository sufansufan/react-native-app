import React, { Component } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Title from './components/Title'
import TabBar from './components/Tabs'
import NavBar from "../components/NavBar";

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      focused ? <Image style={styles.tabBarIcon} source={require('../../images/main_action.png')} /> : <Image style={styles.tabBarIcon} source={require('../../images/main.png')} />
    )
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
