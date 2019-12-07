import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Picker, TextareaItem, Icon, Button, Toast } from '@ant-design/react-native';
import TitleInfo from './TitleInfo'
import { signOrder } from '../../utils/api/orderManage'
import PropTypes from 'prop-types'

const pickerData = [
  {
    value: 'CONFIRMED',
    label: '转移无误-确认'
  },
  {
    value: 'REJECT',
    label: '货物与转移不符-退回'
  },
]

const SignInfo = (props) => {
  const { id, navigation } = props
  const [pickerValue, setPickerValue] = useState({
    value: '',
    label: ''
  })
  const [remark, setRemark] = useState('')
  const changePicker = (value) => {
    const data = pickerData.filter(item => item.value === value[0])[0]
    setPickerValue(data)
  }
  const submit = () => {
    if(!pickerValue.value) {
      Toast.info('请选择操作')
      return
    }
    if(!remark) {
      Toast.info('请输入备注')
      return
    }
    const params = {
      note: remark,
      confirm_status: pickerValue.value
    }
    signOrder(id, params).then(res => {
      Toast.info('提交成功')
      navigation.pop()
    })
  }
  return (
    <View>
      <TitleInfo title='签收信息'/>
      <View style={styles.content}>

        <View style={styles.contentBox}>
          <Picker
            data={pickerData}
            cols={1}
            value={[pickerValue.value]}
            onOk={changePicker}
            itemStyle={{marginBottom: 5, marginTop: 5}}
          >
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text style={styles.font}>操作</Text>
                <TextInput
                style={[styles.input, {width: '55%'}]}
                value={pickerValue.label || '请选择'}
                editable={false}/>
                <Icon name='right'></Icon>
              </View>
            </TouchableOpacity>
          </Picker>
        </View>
        <View>
          <Text style={{fontSize: 18, marginLeft: 13}}>备注</Text>
          <TextareaItem rows={4} placeholder="请输入备注" count={100} value={remark} onChange={text => {setRemark(text)}} style={{ paddingLeft: 15,}}/>
        </View>
      </View>
      <View style={styles.button} >
        <Button type='primary' onPress={submit}>提交</Button>
      </View>
    </View>
  );
}

SignInfo.propTypes = {
  id: PropTypes.string
}

const styles = StyleSheet.create({
  content: {
    flex: 1

  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingRight: 15,
    height: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  },
  input: {
    width: '60%',
    paddingLeft: 10,
    textAlign: 'right',
    fontSize: 18,
    padding: 0,
  },
  font: {
    width: '40%',
    fontSize: 18
  },
  button: {
    width: '80%',
    marginTop: 50,
    marginBottom: 70,
    marginLeft: '10%'
  }
});

export default SignInfo
