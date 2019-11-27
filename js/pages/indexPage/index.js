import React, { Component } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import Title from './components/Title'
import TabBar from './components/Tabs'

export default class IndexPage extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      focused ? <Image style={styles.tabBarIcon} source={require('../../images/main_action.png')} /> : <Image style={styles.tabBarIcon} source={require('../../images/main.png')} />
    )
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{paddingBottom: 10, backgroundColor: '#fff'}}>
            <Title></Title>
          </View>
          <TabBar></TabBar>
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
