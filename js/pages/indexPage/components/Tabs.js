import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Tabs, List, Badge } from '@ant-design/react-native';
import ListItem from './List'

const tabs = [
  { title: <Badge text={'3'}><Text>系统通知</Text></Badge> },
  { title: <Badge text={'3'}><Text>系统消息</Text></Badge> },
];
const TabBar = () => {
  return (
    <View style={{ width: '100%', height: '57%', backgroundColor: '#fff', marginTop: 10, }}>
      <Tabs tabs={tabs} tabBarTextStyle={{fontSize: 18}}>
        <View style={style}>
          <List style={{width: '100%'}}>
            <ListItem></ListItem>
          </List>
        </View>
        <View style={style}>
          <Text>Content of Second Tab</Text>
        </View>
      </Tabs>
    </View>
  )
}
const style = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
}

export default TabBar
