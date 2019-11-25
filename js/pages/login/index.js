import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'antd-mobile';
// import { List, InputItem, Toast } from 'antd-mobile';
// import 'antd-mobile/lib/input-item/index';
// import 'antd-mobile/lib/list/index';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '2222'
    }
  }
  render() {
    return (
      <View style={styles.loginBg}>
        <Text style={styles.name}> 杭州湾经济技术开发区智慧园区平台 </Text>
        <Text> 固废处理子系统 </Text>
        <Button><Text>antd-mobile button</Text></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginBg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cedef8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 5
  }
})

export default Login
