import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { List } from '@ant-design/react-native';
import { getSystemNotice } from '../../../utils/api/home'
const Item = List.Item;
const ListItem = (props) => {
  const { navigation } = props
  console.log(navigation)
  const [systemNotice, setSystemNotice] = useState([])
  const getList = () => {
    getSystemNotice({page: 1}).then(({notices}) => {
      setSystemNotice(notices)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  const goToDetails = () => {
    navigation.push('MessageDetails')
  }
  return (
    <>
    <ScrollView
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {systemNotice.length ? systemNotice.map(item => (
        <TouchableOpacity onPress={goToDetails.bind(this)}  key={item.id + new Date().getTime()} >
          <View style={{paddingLeft: 20, paddingRight: 20, borderWidth: 0.5, borderColor: '#ddd'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between", height: 60 }}>
              <Text style={{ width: '70%'}}>
                {item.content}
              </Text>
              <Text style={{ width: '30%', textAlign: 'right'}}>
                { item.created_at }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )): null}
      </ScrollView>
    </>
  )
}

export default ListItem
