import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Toast } from '@ant-design/react-native';
import { resourceInfoSubmit } from "../../utils/api/orderManage";
import TitleInfo from './TitleInfo'
import PropTypes from "prop-types";

const ResourceInfo = (props) => {
  const {id, navigation, companyInfo} = props
  const [resourceInfo, setResourceInfo] = useState({
    quantity_burning: '',
    quantity_landfill: '',
    quantity_recyclable: ''
  })
  const [editable, setEditable] = useState(true)
  const submit = () => {
    for (const key in resourceInfo) {
      if(key === 'quantity_recyclable' && !resourceInfo['quantity_recyclable']) {
        Toast.info('请输入可回收数')
        return;
      }
      if(key === 'quantity_landfill' && !resourceInfo['quantity_landfill']) {
        Toast.info('请输入可填埋数')
        return;
      }
      if(key === 'quantity_burning' && !resourceInfo['quantity_burning']) {
        Toast.info('请输入可焚烧数')
        return;
      }
    }
    resourceInfoSubmit(id, resourceInfo).then(res => {
      Toast.info('提交成功')
      navigation.pop()
    })
  }
  useEffect(() => {
    if(companyInfo && companyInfo.quantity_burning) {
      const { quantity_burning, quantity_landfill, quantity_recyclable} = companyInfo
      setEditable(false)
      setResourceInfo({
        quantity_burning: String(quantity_burning),
        quantity_landfill: String(quantity_landfill),
        quantity_recyclable: String(quantity_recyclable)
      })
    }
  }, [companyInfo])
  return (
    <View>
      <TitleInfo title='资源化信息'/>
      <View style={styles.content}>
        <Text style={styles.font}>可回收</Text>
        <TextInput
          style={styles.input}
          placeholder='请输入可回收'
          editable={editable}
          onChangeText={text => {
            setResourceInfo({
              ...resourceInfo,
              quantity_recyclable: text
            })
          }}
          value={resourceInfo.quantity_recyclable}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>可填埋</Text>
        <TextInput
          style={styles.input}
          placeholder='请输入可填埋'
          editable={editable}
          onChangeText={text => {
            setResourceInfo({
              ...resourceInfo,
              quantity_landfill: text
            })
          }}
          value={resourceInfo.quantity_landfill}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>可焚烧</Text>
        <TextInput
          style={styles.input}
          placeholder='请输入可焚烧'
          editable={editable}
          onChangeText={text => {
            setResourceInfo({
              ...resourceInfo,
              quantity_burning: text
            })
          }}
          value={resourceInfo.quantity_burning}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
      { editable ? <View style={styles.button} >
        <Button type='primary' onPress={submit}>提交</Button>
      </View> : null}
    </View>
  );
}

ResourceInfo.propTypes = {
  companyInfo: PropTypes.object
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  input: {
    width: '60%',
    paddingLeft: 10,
    textAlign: 'right',
    marginRight: 10,
    fontSize: 18,
    padding: 0,
  },
  font: {
    width: '30%',
    fontSize: 18
  },
  button: {
    width: '80%',
    marginTop: 50,
    marginBottom: 70,
    marginLeft: '10%'
  }
});

export default ResourceInfo
