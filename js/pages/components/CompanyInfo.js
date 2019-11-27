import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import TitleInfo from './TitleInfo'

const CompanyInfo = (props) => {
  const [phone, setPhone] = useState('')
  return (
    <View>
      <TitleInfo title='产废单位信息'/>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>企业名称</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          editable={false}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>组织机构代码</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>工商注册地址</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>负责人</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>负责人联系电话</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>处置单位</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>司机</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>车牌</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
      <View style={styles.content}>
        <Text style={{width: '30%'}}>处置单位</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    height: 30,
    width: '65%',
    borderColor: '#5ab0ff',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
});

export default CompanyInfo
