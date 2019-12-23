import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Button, Toast, Provider } from '@ant-design/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavBar from '../components/NavBar'
import TitleInfo from '../components/TitleInfo'
import AsyncStorage from '@react-native-community/async-storage';

const AddWaste = (props) => {
  const { navigation } = props
  const [wasteInfo, setWasteInfo] = useState({
    name: "",
    source: "",
    storage_location: "",
    quantity: "",
    note: ""
  })
  const add = async() => {
    for (const key in wasteInfo) {
      if(!wasteInfo[key]){
        switch (key) {
          case 'name':
            Toast.info('请输入固废名称')
            return;
          case 'source':
            Toast.info('请输入固废来源')
            return;
          case 'storage_location':
            Toast.info('请输入固废地址')
            return;
          case 'quantity':
            Toast.info('请输入固废吨数')
            return;
          case 'note':
            Toast.info('请输入备注')
            return;
          default:
            break;
        }
      }
    }
    const item = JSON.parse(await AsyncStorage.getItem('wasteInfo'))
    var wasteInfoArray = []
    item ? wasteInfoArray =  [...item, wasteInfo] : wasteInfoArray = [wasteInfo]
    await AsyncStorage.setItem('wasteInfo', JSON.stringify(wasteInfoArray))
    back()
  }
  const back = async() => {
    const { user_type } = JSON.parse(await AsyncStorage.getItem('userInfo'))
    navigation.replace({routeName: 'OrderDetails', params: {userType: user_type, edit: true, navRightText: '新建联单', }})
  }
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{flex: 1}}>
        <Provider>
          <NavBar {...props} title='联单管理' hideRight={true} pressLeft={back}></NavBar>
          <TitleInfo title='固废信息列表'/>
          <View style={styles.container}>
            <View style={styles.contentBox}>
              <Text style={styles.font}>固废名称</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入固废名称'
                onChangeText={text => setWasteInfo({...wasteInfo, name: text})}
                value={wasteInfo.name}
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>固废来源</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入固废来源'
                onChangeText={text => setWasteInfo({...wasteInfo, source: text})}
                value={wasteInfo.source}
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>固废储存地址</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setWasteInfo({...wasteInfo, storage_location: text})}
                value={wasteInfo.storage_location}
                placeholder='请输入固废地址'
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>固废吨数</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setWasteInfo({...wasteInfo, quantity: text})}
                value={wasteInfo.quantity}
                placeholder='请输入固废吨数'
                keyboardType='numeric'
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>备注</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setWasteInfo({...wasteInfo, note: text})}
                placeholder='请输入备注'
                value={wasteInfo.note}
              />
            </View>
            <View style={styles.button}>
              <Button type='primary' onPress={add}>新增</Button>
            </View>
          </View>
        </Provider>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '93%',
  },
  contentBox: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  input: {
    width: '65%',
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 18,
    paddingRight: 15,
  },
  font: {
    width: '35%',
    fontSize: 18
  },
  button: {
    width: '80%',
    marginLeft: '10%',
    marginTop: 70,
  }
});

export default AddWaste
