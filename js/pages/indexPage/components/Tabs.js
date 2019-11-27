import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Tabs, List  } from '@ant-design/react-native';
import ListItem from './List'

const tabs = [
  { title: '系统通知' },
  { title: '系统消息' },
];
const TabBar = () => {
  return (
    <View style={{ width: '100%', height: 200, backgroundColor: '#fff', marginTop: 10, }}>
      <Tabs tabs={tabs}>
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
