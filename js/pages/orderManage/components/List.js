import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const ListItem = (props) => {
  const { navigation } = props;
  return (
    <Item wrap multipleLine onPress={() => {navigation.push('OrderDetails')}}>
      <View style={styles.listBox}>
        <Text style={{ width: '75%'}}>
          这是一条最新消息这是一条最新消息这是一条最新消息这是一条最新消
        </Text>
        <View style={{width: '20%', alignItems: 'flex-end',}}>
          <Image style={styles.image} source={require('../../../images/arrow.png')} />
        </View>
      </View>
    </Item>
  )
}

const styles = StyleSheet.create({
  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between"
  },
  image: {
    width: 21,
    height: 21,
  }
})
export default ListItem
