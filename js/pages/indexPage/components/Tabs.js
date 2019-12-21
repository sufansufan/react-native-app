import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tabs, List, Badge } from '@ant-design/react-native';
import ListItem from './List'



const TabBar = (props) => {
  const tabRef = useRef(null)
  const [tabIndex, setTabIndex] = useState(0)
  const tabChange = (index) => {
    setTabIndex(index)
  }
  const tabs = [
    { title: <Text>系统通知</Text>  },
    { title:  <Text>系统消息</Text>},
  ];
  return (
    <View style={{ width: '100%', height: '57%', backgroundColor: '#FAFAFB', marginTop: 10, }}>
      <View style={styles.tabBox}>
        <TouchableOpacity style={{width: '49%'}} onPress={tabChange.bind(this, 0)}>
          <View style={tabIndex === 0 ? styles.activeLeft : styles.default}>
            <Text style={[{fontSize: 18,}, tabIndex === 0 ? {color: '#fff'} : {color: '#1C8BC1'}]}>系统通知</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '49%'}} onPress={tabChange.bind(this, 1)}>
          <View style={tabIndex === 1 ? styles.activeRight : styles.default}>
            <Text style={[{fontSize: 18,}, tabIndex === 1 ? {color: '#fff'} : {color: '#1C8BC1'}]}>系统消息</Text>
          </View>
        </TouchableOpacity>
      </View>
      {tabIndex === 0 ? <View style={style}>
          <View style={{width: '100%'}}>
            <ListItem {...props}></ListItem>
          </View>
        </View> : <View style={style}>
          <Text style={{color: '#999', height: 50, lineHeight: 50}}>暂无系统消息</Text>
        </View>}
      {/* <Tabs tabs={tabs} ref={tabRef} onChange={onChange} style={{ width: '100%'}} onTabClick={onTabClick}>
        <View style={style}>
          <List style={{width: '100%'}}>
            <ListItem {...props}></ListItem>
          </List>
        </View>
        <View style={style}>
          <Text>Content of Second Tab</Text>
        </View>
      </Tabs> */}
    </View>
  )
}
const style = {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  marginTop: 10,
}
const styles = StyleSheet.create({
  tabBox: {
    width: '90%',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#1C8BC1',
    marginLeft: '5%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  activeLeft: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C8BC1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  activeRight: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C8BC1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  default: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default TabBar
