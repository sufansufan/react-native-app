import React, { useState, useEffect } from 'react';
import {View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { Accordion, List, Button, Icon } from '@ant-design/react-native';
import TitleInfo from './TitleInfo'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage';
import { handlerWaste } from '../../utils/index'
import NoData from './noData'

const ChangeInfo = (props) => {
  const { navigation, edit, wasteInfo } = props
  const [activeSections, setActiveSections] = useState([])
  const [changeInfo, setChangeInfo] = useState([])
  useEffect(() => {
    (async function () {
      if(edit) {
        let data = JSON.parse(await AsyncStorage.getItem('wasteInfo'))
        await setChangeInfo(handlerWaste(data))
      }else {
        setChangeInfo(handlerWaste(wasteInfo))
      }
    })()
    return () => {
      // JSON.parse(await AsyncStorage.getItem('wasteInfo'))
    }
  },[wasteInfo])
  const onChange = activeSections => {
    setActiveSections(activeSections)
  }
  const deleteWaste = async(index) => {
    let data = JSON.parse(await AsyncStorage.getItem('wasteInfo'))
    data.splice(index, 1)
    await AsyncStorage.setItem('wasteInfo', JSON.stringify(data))
    await setChangeInfo(handlerWaste(data))
  }
  const accordionList = changeInfo.length && changeInfo.map((item, index) => {
    return (
      <Accordion.Panel header={item.title + ` (${item.name}固废)`} key={index}>
        <List>
          {item.children.length ? <View>{
            item.children.map((val, i) => (
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
            ))}
              { edit ? (<View style={{marginTop: 30, marginBottom: 30}}>
                <Button onPress={deleteWaste.bind(this, index)} style={{width: '80%', marginLeft: '10%', borderColor: 'red'}} >
                  <Text style={{color: 'red'}}>
                    删除
                  </Text>
                </Button>
              </View>) : null}
            </View> : null }
        </List>
      </Accordion.Panel>
    )
  })
  return (
    <View>
      <TitleInfo title='固废转移信息'/>
      <View style={styles.list}>
        {changeInfo.length ? <TouchableOpacity>
          <Accordion
            onChange={onChange}
            activeSections={activeSections}
          >
            {accordionList}
          </Accordion>
        </TouchableOpacity> : edit ? null : <NoData/>}
        {edit ? (<View style={{marginTop: 50, marginBottom: 20}}>
          <Button Icon='plus' onPress={()=> {navigation.replace('AddWaste')}} style={{width: '80%', marginLeft: '10%'}}>
            <Icon name='plus' color='#108ee9' size='xxs'/>
            <Text style={styles.buttonBox}>
              新增固废
            </Text>
          </Button>
        </View>) : null}
      </View>
    </View>

  );
}

ChangeInfo.propTypes = {
  edit: PropTypes.bool,
  wasteInfo: PropTypes.array
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
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
