import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Button } from '@ant-design/react-native';

const Login = (props) =>  {
  const [phone, setPhone] = useState('222')
  const { navigation } = props
  return (
    <View style={styles.loginBg}>
      <Text style={styles.title}> 杭州湾经济技术开发区智慧园区平台 </Text>
      <Text> 固废处理子系统 </Text>
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
      <Button type='primary' style={{width: 260, marginTop: 30}} onPress={() => {navigation.push('BottomNavigator')}}>登录</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  loginBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: '#5ab0ff',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
  inputName: {
    width: 60
  }
})

export default Login
