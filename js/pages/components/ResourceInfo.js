import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import TitleInfo from './TitleInfo'

const ResourceInfo = (props) => {
  const [phone, setPhone] = useState('423423423')
  return (
    <View>
      <TitleInfo title='资源化信息'/>
      <View style={styles.content}>
        <Text style={styles.font}>可回收</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          editable={false}
          value={phone}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>可填埋</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>可焚烧</Text>
        <TextInput
          style={styles.input}
          // onChangeText={text => onChangeText(text)}
          value={phone}
        />
        <Text style={{ fontSize: 18}}>吨</Text>
      </View>
    </View>
  );
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
  }
});

export default ResourceInfo
