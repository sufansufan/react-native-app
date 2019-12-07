import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Icon } from '@ant-design/react-native';
import Proptypes from "prop-types";
const Item = List.Item;
const ListItem = (props) => {
  const { navigation, orderList } = props;
  const goToDetails = (item) => {
    const { status, id } = item
    console.log(status)
    if(status === '等待分配司机') {
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'WAITING_DRIVER' }})
    }else if(status === '已经分配司机等待清运') {
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'CLEAN_REMOVE' }})
    }else if(status === '开始清运'){
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'START_REMOVE' }})
    }else if(status === '结束清运'){
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'END_REMOVE' }})
    }else {
      navigation.navigate({routeName: 'OrderDetails', params: {id}})
    }
  }
  return (
    <>
      { orderList.length ? orderList.map(item => (
        <TouchableOpacity onPress={goToDetails.bind(this, item)} activeOpacity={0.6} key={item.id}>
          <View style={styles.listBox}>
            <Text style={{ width: '75%'}}>
              <Text>{item.company.name}-预计清运时间{item.created_at}</Text>
            </Text>
            <View style={{width: '20%', alignItems: 'flex-end',}}>
              <Icon name='right'></Icon>
            </View>
          </View>
        </TouchableOpacity>
      )): null }

    </>
  )
}

ListItem.proptypes = {
  orderList: Proptypes.array
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
