import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Button, Toast, Provider } from '@ant-design/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavBar from '../components/NavBar'
import { changePassword } from "../../utils/api/myPage/index";
import AsyncStorage from '@react-native-community/async-storage';

const AddWaste = (props) => {
  const { navigation } = props
  const [userInfo, setUserInfo] = useState({
    oldPassword: '',
    password: '',
    configPassword: '',
  })
  const submit = async() => {
    for (const key in userInfo) {
      if(!userInfo[key]){
        switch (key) {
          case 'oldPassword':
            Toast.info('请输入原密码')
            return;
          case 'password':
            Toast.info('请输入新密码')
            return;
          case 'configPassword':
            Toast.info('请输入确认密码')
            return;
          default:
            break;
        }
      }
    }
    if(userInfo.password !== userInfo.configPassword) {
      Toast.info('新密码与确认密码不一致')
      return;
    }
    const { oldPassword, password }  = userInfo
    changePassword({old_password: oldPassword, password}).then(res => {
      console.log(res)
      if(res.ok === 1) {
        Toast.success('修改成功', 2);
        setTimeout(() => {
          navigation.replace({routeName: 'Login'})
          AsyncStorage.multiRemove(['userInfo'])
        }, 500);
      }else {
        Toast.info(res.msg);
      }
    })
  }
  const pressLeft = () => {
    navigation.pop()
  }
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{flex: 1}}>
        <Provider>
          <NavBar {...props} title='修改密码' hideRight={true} pressLeft={pressLeft}></NavBar>
          <View style={{height: 5, width: '100%'}}></View>
          <View style={styles.container}>
            <View style={styles.contentBox}>
              <Text style={styles.font}>原密码</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入原密码'
                onChangeText={text => setUserInfo({...userInfo, oldPassword: text})}
                value={userInfo.oldPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>新密码</Text>
              <TextInput
                style={styles.input}
                placeholder='请输入新密码'
                onChangeText={text => setUserInfo({...userInfo, password: text})}
                value={userInfo.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.font}>确认密码</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setUserInfo({...userInfo, configPassword: text})}
                value={userInfo.configPassword}
                placeholder='请输入确认密码'
                secureTextEntry={true}
              />
            </View>
            <View style={styles.button}>
              <Button type='primary' onPress={submit}>提交</Button>
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
