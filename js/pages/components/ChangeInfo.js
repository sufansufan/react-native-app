import React, { useState } from 'react';
import {View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import TitleInfo from './TitleInfo'
const tableHead = ['固废名称', '固废来源', '储存地点', '固废吨数', '备注']
const ChangeInfo = (props) => {
  const [tableData, setTableData] = useState([
    ['1', '2', '3', '4', '2'],
    ['a', 'b', 'c', 'd', '22'],
    ['1', '2', '3', '456', '222'],
    ['a', 'b', 'c', 'd', '333']
  ])
  return (
    <View>
      <TitleInfo title='产废单位信息'/>
      <View style={styles.Table}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Table: {
    flex: 1,
    padding: 10,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

export default ChangeInfo
