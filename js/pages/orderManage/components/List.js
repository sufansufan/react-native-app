import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const ListItem = (props) => {
  const { navigation } = props;
  return (
    <>
      <TouchableOpacity onPress={() => {navigation.push('OrderDetails')}} activeOpacity={0.6} >
        <View style={styles.listBox}>
          <Text style={{ width: '75%'}}>
            这是一条最新消息这是一条最新消息这是一条最新消息这是一条最新消
          </Text>
          <View style={{width: '20%', alignItems: 'flex-end',}}>
            <Image style={styles.image} source={require('../../../images/arrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.push('OrderDetails')}} activeOpacity={0.6} >
        <View style={styles.listBox}>
          <Text style={{ width: '75%'}}>
            这是一条最新消息这是一条最新消息这是一条最新消息这是一条最新消
          </Text>
          <View style={{width: '20%', alignItems: 'flex-end',}}>
            <Image style={styles.image} source={require('../../../images/arrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    minHeight: 60
  },
  image: {
    width: 21,
    height: 21,
  }
})
export default ListItem
