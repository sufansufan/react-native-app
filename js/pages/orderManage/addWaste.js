import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, } from '@ant-design/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavBar from '../components/NavBar'
import TitleInfo from '../components/TitleInfo'

const AddWaste = (props) => {
  const { navigation } = props
  const [phone, setPhone] = useState('')
  const onChange = (value) => {
    setPickerValue(value)
  }
  pressLeft = () => {
    navigation.pop()
  }
  return (
    <KeyboardAwareScrollView>
      <NavBar {...props} title='联单管理' hideRight={true} pressLeft={pressLeft}></NavBar>
      <TitleInfo title='固废信息列表'/>
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.font}>固废来源</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
            defaultValue='请输入固废来源'
          />
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.font}>固废储存地址</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
          />
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.font}>固废吨数</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
          />
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.font}>备注</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={phone}
          />
        </View>
        <View style={styles.button}>
          <Button type='primary'>新增</Button>
        </View>
      </View>
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
