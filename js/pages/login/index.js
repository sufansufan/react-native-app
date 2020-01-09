import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Toast, Provider  } from '@ant-design/react-native';
import { loginByUsername } from '../../utils/api/login'
import { upgrade } from "../../utils/api/home/index";

const Login = (props) =>  {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  })
  const { navigation } = props
  const login = async() => {
    const {username, password} = userInfo
    if(!username){
      Toast.info('请输入用户名')
      return;
    }
    if(!password){
      Toast.info('请输入密码')
      return;
    }
    loginByUsername({username, password,}).then(res => {
      if(res.data.error_code === 9999) {
        Toast.fail(res.data.msg, 2)
      }else {
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data))
        getVersion()
        navigation.replace('BottomNavigator')
      }
    })
  }
  const getVersion = () => {
    upgrade().then(({ version }) => {
      AsyncStorage.setItem('version', JSON.stringify(version))
    })
  }
  return (
    <Provider>
      <View style={styles.loginBg}>
        <Text style={styles.title}> 杭州湾经济技术开发区智慧园区平台 </Text>
        <Text style={{fontSize: 18}}> 固废处理子系统 </Text>
        <View style={[styles.loginBg, {width: '100%', marginTop: 30}]}>
          <View style={styles.viewInput}>
            <Text style={styles.inputName}>用户名：</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setUserInfo({...userInfo, username: text})}
              value={userInfo.username}
              placeholder='请输入用户名'
            >
            </TextInput>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.inputName}>密码：</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setUserInfo({...userInfo, password: text})}
              value={userInfo.password}
              placeholder='请输入密码'
              textContentType='password'
              secureTextEntry={true}
              autoComplete={'password'}
            >
            </TextInput>
          </View>
        </View>
        <Button type='primary' style={{width: '80%', marginTop: 60}} onPress={login}>登录</Button>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  loginBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    marginTop: '45%',
    marginBottom: 5
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: '#5ab0ff',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingLeft: 10,
  },
  inputName: {
    width: '20%',
    fontSize: 18
  }
})

export default Login
