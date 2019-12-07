import React from "react";
import { Text, View } from 'react-native';

const NoData = () => (
  <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
    <Text style={{color: '#ddd', fontSize: 20,  marginBottom: 10, marginTop: 10,}}>
      暂无数据
    </Text>
  </View>

)

export default NoData
