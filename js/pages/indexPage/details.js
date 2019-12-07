import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NavBar from '../components/NavBar'
const MessageDetails = (props) => {
  const { navigation } = props
  const pressLeft = () => {
    navigation.pop()
  }
  return (
    <>
      <NavBar {...props} hideRight={true} title='通知详情' pressLeft={pressLeft}></NavBar>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text>通知详情</Text>
      </ScrollView>
    </>
  )
}

export default MessageDetails
