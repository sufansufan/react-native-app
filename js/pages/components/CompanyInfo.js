import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import { List, Picker } from '@ant-design/react-native';
import TitleInfo from './TitleInfo'
const pickerData = [
  {
    value: '1',
    label: '转移无误-确认'
  },
  {
    value: '2',
    label: '货物与转移不符-退回'
  },
]
const CompanyInfo = (props) => {
  const [phone, setPhone] = useState('423423423')
  const [pickerValue, setPickerValue] = useState('')
  const onChange = (value) => {
    setPickerValue(value)
  }
  return (
    <View>
      <TitleInfo title='产废单位信息'/>
      <List>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>企业名称</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              editable={false}
              value={phone}
            />
          </View>
        </List.Item>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>组织机构代码</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              value={phone}
              editable={false}
            />
          </View>
        </List.Item>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>工商注册地址</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              value={phone}
              editable={false}
            />
          </View>
        </List.Item>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>负责人</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              value={phone}
              editable={false}
            />
          </View>
        </List.Item>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>负责人联系电话</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              value={phone}
              editable={false}
            />
          </View>
        </List.Item>
        <List.Item>
          <View style={styles.content}>
            <Text style={styles.font}>处置单位</Text>
            <TextInput
              style={styles.input}
              // onChangeText={text => onChangeText(text)}
              value={phone}
              editable={false}
            />
          </View>
        </List.Item>
        <View>
          <Picker
            data={pickerData}
            cols={1}
            value={pickerValue}
            onChange={onChange}
          >
            <List.Item arrow="horizontal" style={{height: 50}}>
              司机
            </List.Item>
          </Picker>
        </View>
        <View>
          <Picker
            data={pickerData}
            cols={1}
            value={pickerValue}
            onChange={onChange}
          >
            <List.Item arrow="horizontal" style={{height: 50}}>
              车牌
            </List.Item>
          </Picker>
        </View>
        <View>
          <Picker
            data={pickerData}
            cols={1}
            value={pickerValue}
            onChange={onChange}
          >
            <List.Item arrow="horizontal" style={{height: 50}}>
              处置单位
            </List.Item>
          </Picker>
        </View>
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '65%',
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 18,
    height: 42
  },
  font: {
    width: '35%',
    fontSize: 18
  },
});

export default CompanyInfo
