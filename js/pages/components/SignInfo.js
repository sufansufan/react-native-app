import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { List, Picker, TextareaItem } from '@ant-design/react-native';
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

const SignInfo = (props) => {
  const [pickerValue, setPickerValue] = useState('请选择')
  const [remark, setRemark] = useState('')
  const onChange = (value) => {
    setPickerValue(value)
  }
  return (
    <View>
      <TitleInfo title='签收信息'/>
      <View style={styles.content}>
        <List>
          <Picker
            data={pickerData}
            cols={1}
            value={pickerValue}
            onChange={onChange}
          >
            <List.Item arrow="horizontal">
              操作
            </List.Item>
          </Picker>
        </List>
        <View>
          <Text style={{fontSize: 18, marginLeft: 13}}>备注</Text>
          <TextareaItem rows={4} placeholder="请输入备注" count={100} value={remark} style={{ paddingLeft: 15,}}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10
  },
});

export default SignInfo
