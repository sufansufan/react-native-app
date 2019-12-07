import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { List } from '@ant-design/react-native';
import { getSystemNotice } from '../../../utils/api/home'
const Item = List.Item;
const ListItem = (props) => {
  const { navigation } = props
  const [systemNotice, setSystemNotice] = useState([])
  // navigation.push('MessageDetails')
  const getList = () => {
    getSystemNotice({page: 1}).then(({notices}) => {
      setSystemNotice(notices)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  return (
    <>
    <ScrollView
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {systemNotice.length ? systemNotice.map(item => (
        <Item wrap multipleLine onPress={() => {}} key={item.id}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 50 }}>
            <Text style={{ width: '70%'}}>
              {item.content}
            </Text>
            <Text style={{ width: '30%', textAlign: 'right'}}>
              { item.created_at }
            </Text>
          </View>
        </Item>
      )): null}
      </ScrollView>
    </>
  )
}

export default ListItem
