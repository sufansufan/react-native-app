import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { List, } from '@ant-design/react-native';
import NavBar from '../components/NavBar'
import TitleInfo from '../components/TitleInfo'

const AddWaste = (props) => {
  const [phone, setPhone] = useState('')
  const onChange = (value) => {
    setPickerValue(value)
  }
  return (
    <View style={styles.content}>
      <NavBar {...props} title='联单管理' hideRight={true}></NavBar>
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TitleInfo title='固废信息列表'/>
          <List>
            <List.Item>
              <View style={styles.contentBox}>
                <Text style={styles.font}>固废来源</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={text => onChangeText(text)}
                  value={phone}
                  defaultValue='请输入固废来源'
                />
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.contentBox}>
                <Text style={styles.font}>固废储存地址</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={text => onChangeText(text)}
                  value={phone}
                />
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.contentBox}>
                <Text style={styles.font}>固废吨数</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={text => onChangeText(text)}
                  value={phone}
                />
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.contentBox}>
                <Text style={styles.font}>备注</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={text => onChangeText(text)}
                  value={phone}
                />
              </View>
            </List.Item>
          </List>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    height: '93%',
  },
  contentBox: {
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

export default AddWaste
