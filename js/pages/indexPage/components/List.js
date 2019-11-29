import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const ListItem = () => {
  return (
    <>
    <ScrollView
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
        <Item wrap multipleLine onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
            <Text style={{ width: '75%'}}>
              这是一条最新消息这是一条最新消息这是一条最新消息这是一
            </Text>
            <Text style={{ width: '20%', textAlign: 'right'}}>
              1个小时前
            </Text>
          </View>
        </Item>
      </ScrollView>
    </>
  )
}

export default ListItem
