import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { List, Icon } from '@ant-design/react-native';
import Proptypes from "prop-types";
import NoData from '../../components/noData'
const Item = List.Item;
const ListItem = (props) => {
  const { navigation, orderList, getOrderListFromList, showFoot, isRefreshing, } = props;
  const goToDetails = (item) => {
    const { status, id } = item
    if(status === '等待分配司机') {
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'WAITING_DRIVER' }})
    }else if(status === '已经分配司机等待清运') {
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'CLEAN_REMOVE' }})
    }else if(status === '开始清运'){
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'START_REMOVE' }})
    }else if(status === '结束清运'){
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'END_REMOVE' }})
    }else if(status === '已完成'){
      navigation.navigate({routeName: 'OrderDetails', params: {id, edit: false, type: 'FINISH' }})
    }else {
      navigation.navigate({routeName: 'OrderDetails', params: {id}})
    }
  }
  const  _renderItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={goToDetails.bind(this, item)} activeOpacity={0.6} key={item + new Date().getTime()}>
        <View style={styles.listBox}>
          <View style={{ width: '75%'}}>
            <Text style={{fontSize: 16}}>{item.company.name}</Text>
            <View>
              <Text style={{marginTop: 2, color: '#999',}}>预计清运时间 {item.created_at}</Text>
            </View>
          </View>
          <View style={{width: '20%', alignItems: 'flex-end',}}>
            <Icon name='right'></Icon>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  const _renderFooter = () => {
    if (showFoot === 1) {
        return (
            <View style={{height:30, alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    } else if(showFoot === 2) {
        return (
            <View style={styles.footer}>
                <ActivityIndicator />
                <Text>正在加载更多数据...</Text>
            </View>
        );
    } else if(showFoot === 0){
        return (
            <View style={styles.footer}>
                <Text></Text>
            </View>
        );
    }
  }
  return (
    <>
      {
        orderList.length ?
        <FlatList
          data={orderList}
          renderItem={_renderItemView}
          onEndReachedThreshold={1}
          onEndReached={getOrderListFromList.bind(this, 'pull')}
          ListFooterComponent={_renderFooter}
          onRefresh={getOrderListFromList.bind(this, 'down')}
          refreshing={isRefreshing}
          /> : <NoData/>
      }
      {/* { orderList.length ? orderList.map(item => (
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
      )): null } */}

    </>
  )
}

ListItem.proptypes = {
  orderList: Proptypes.array,
  getOrderListFromList: Proptypes.func,
  showFoot: Proptypes.number,
  isRefreshing:  Proptypes.bool,
  getOrderListFromListDown: Proptypes.func
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
  },
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    marginTop: 10,
  },
})
export default ListItem
