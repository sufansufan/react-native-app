import React from 'react';
import { View, Text } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const ListItem = () => {
  return (
    <Item wrap multipleLine onPress={() => {}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between" }}>
        <Text style={{ width: '75%'}}>
          这是一条最新消息这是一条最新消息这是一条最新消息这是一
        </Text>
        <Text style={{ width: '20%'}}>
          1个小时前
        </Text>
      </View>
    </Item>
  )
}

export default ListItem
