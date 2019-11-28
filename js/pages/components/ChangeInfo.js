import React, { useState } from 'react';
import {View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { Accordion, List, Button, Icon } from '@ant-design/react-native';
import TitleInfo from './TitleInfo'
const ChangeInfo = (props) => {
  const { navigation } = props
  const [activeSections, setActiveSections] = useState([1])
  const [changeInfo, setChangeInfo] = useState([{
    title: '固废名称',
    name: '某某固废',
    children: [
      {
        title: '固废来源:',
        name: '3423424434',
      },
      {
        title: '储存地点:',
        name: '3423423444',
      },
      {
        title: '固废吨数:',
        name: '34234234444',
      },
      {
        title: '备注:',
        name: '342342344234',
      }
    ]
  }])
  const onChange = activeSections => {
    setActiveSections(activeSections)
  }
  const accordionList = changeInfo.map((item, index) => {
    return (
      <Accordion.Panel header={item.title} key={index}>
        <List>
          {item.children.length ? item.children.map((val, i) => (
            <List.Item style={styles.listBox} key={i + '1'}>
              <View style={styles.listContent}>
                <View>
                  <Text style={{fontSize: 16}}>
                    {val.title}
                  </Text>
                </View>
                <View style={styles.listText}>
                  <Text style={{fontSize: 16}} numberOfLines={1}>
                    {val.name}
                  </Text>
                </View>
              </View>
            </List.Item>
          )) : null }

        </List>
      </Accordion.Panel>
    )
  })
  return (
    <View>
      <TitleInfo title='固废转移信息'/>
      <View style={styles.list}>
        <TouchableOpacity>
          <Accordion
            onChange={onChange}
            activeSections={activeSections}
          >
            {accordionList}
          </Accordion>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <Button Icon='plus' onPress={()=> {navigation.push('AddWaste')}}>
            <Icon name='plus' color='#108ee9' size='xxs'/>
            <Text style={styles.buttonBox}>
              新增固废
            </Text>
          </Button>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  listBox: {
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    width: '75%',
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  buttonBox: {
    color: '#108ee9',
    marginLeft: 20
  }
});

export default ChangeInfo
