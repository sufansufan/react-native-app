import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import NavBar from '../components/NavBar'
const MessageDetails = (props) => {
  const { navigation } = props
  const pressLeft = () => {
    navigation.pop()
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavBar {...props} hideRight={true} title='通知详情' pressLeft={pressLeft}></NavBar>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{textAlign:'center', color: '#999', lineHeight: 40, fontSize: 14}}>暂无通知详情</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MessageDetails
