import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Button } from '@ant-design/react-native';

const Login = (props) =>  {
  const [phone, setPhone] = useState('222')
  const { navigation } = props
  return (
    <View style={styles.loginBg}>
      <Text style={styles.title}> 杭州湾经济技术开发区智慧园区平台 </Text>
      <Text style={{fontSize: 18}}> 固废处理子系统 </Text>
      <View style={[styles.loginBg, {width: '100%', marginTop: 30}]}>
        <View style={styles.viewInput}>
          <Text style={styles.inputName}>用户名：</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
          >
          </TextInput>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.inputName}>密码：</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
          >
          </TextInput>
        </View>
      </View>
      <Button type='primary' style={{width: '80%', marginTop: 60}} onPress={() => {navigation.push('BottomNavigator')}}>登录</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  loginBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 25,
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
