import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { List, Picker, Icon, Provider } from '@ant-design/react-native';

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
  const { company, edit } = props
  const [phone, setPhone] = useState('2222')
  const [pickerValue, setPickerValue] = useState('')
  const onChange = (value) => {
    setPickerValue(value)
    console.log(value)
  }
  return (
    <Provider>
      <List>
        <Picker
          data={pickerData}
          cols={1}
          value={pickerValue}
          onOk={onChange}
          itemStyle={{marginBottom: 5, marginTop: 5}}
        >
           <List.Item arrow="horizontal" >
              省市选择(异步加载)
            </List.Item>
        </Picker>
      </List>
    </Provider>
  );
}


export default CompanyInfo
