import React, { useState, useEffect, forwardRef } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { List, Picker, Icon } from '@ant-design/react-native';
import TitleInfo from './TitleInfo'
import PropTypes  from 'prop-types'
import { getHandleCompany, getDrivers, getCars } from '../../utils/api/orderManage'
import { changeLabelAndName } from '../../utils/index'
import AsyncStorage from '@react-native-community/async-storage';


const CompanyInfo = (props) => {
  const { company, edit, companyInfo, type } = props
  const [handleCompanyData, setHandleCompanyData] = useState([])
  const [handleCompanyInfo, setHandleCompanyInfo] = useState({})
  const [driversData, setDriversData] = useState([])
  const [carsData, setCarsData] = useState([])
  const [distributeDrivers, setDistributeDrivers] = useState({
    drivers: {
      value: '',
      label: ''
    },
    cars: {
      value: '',
      label: ''
    }
  })
  const changeCompany = (value) => {
    const data = handleCompanyData.length && handleCompanyData.filter(item => (item.value === value[0]))[0]
    AsyncStorage.setItem('CompanyInfo', JSON.stringify(data))
    setHandleCompanyInfo(data)
  }
  useEffect(() => {
    if(edit) {
      getHandleCompany().then(({companies}) => {
        setHandleCompanyData(changeLabelAndName(companies, 'id', 'name'))
      })
    }
    (async function () {
      let data = JSON.parse(await AsyncStorage.getItem('CompanyInfo'))
      if(data) {
        setHandleCompanyInfo(data)
      }
    })()
  }, [edit])
  useEffect(()=> {
    if(type === 'WAITING_DRIVER'){
      AsyncStorage.setItem('distributeDrivers', JSON.stringify(distributeDrivers))
      getDrivers().then(({drivers}) => {
        setDriversData(changeLabelAndName(drivers, 'id', 'name'))
      })
      getCars().then(({cars}) => {
        setCarsData(changeLabelAndName(cars, 'id', 'code'))
      })
    }
  }, [type])
  const changeDrivers = async(type,value) => {
    const distributeDrivers =  JSON.parse(await AsyncStorage.getItem('distributeDrivers'))
    if(type === 'drivers') {
      const drivers = driversData.length && driversData.filter(item => (item.value === value[0]))[0]
      setDistributeDrivers({
        ...distributeDrivers,
        drivers,
      })
      AsyncStorage.setItem('distributeDrivers', JSON.stringify({...distributeDrivers ,drivers}))
    }
    if(type === 'cars'){
      const cars = carsData.length && carsData.filter(item => (item.value === value[0]))[0]
      setDistributeDrivers({
        ...distributeDrivers,
        cars,
      })
      AsyncStorage.setItem('distributeDrivers', JSON.stringify({...distributeDrivers, cars}))
    }

  }

  const noEditor = (
    <>
      <View style={styles.content}>
        <Text style={styles.font}>司机</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={companyInfo && companyInfo.driver_name}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>车牌</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={companyInfo && companyInfo.car_code}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.font}>处置单位</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={companyInfo && companyInfo.disposal_company_name}
        />
      </View>
    </>
  )
  const displayEditor = () => {
    if(company.user_type === 'COMPANY' && type !== 'WAITING_DRIVER') {
      return (
        <>
          <View style={styles.content}>
            <Picker
                data={handleCompanyData}
                cols={1}
                value={[handleCompanyInfo.value]}
                onOk={changeCompany}
                itemStyle={{marginBottom: 5, marginTop: 5}}
              >
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={styles.font}>处置单位</Text>
                    <TextInput
                    style={[styles.input, {width: '55%'}]}
                    value={handleCompanyInfo.label || '请选择'}
                    editable={false}/>
                    <Icon name='right'></Icon>
                  </View>
                </TouchableOpacity>
              </Picker>
          </View>
        </>
      )
    }else if( company.user_type === 'COMPANY' && type === 'WAITING_DRIVER') {
      return (
        noEditor
      )
    }else if(type === 'WAITING_DRIVER') {
      return (
        <View>
          <View style={styles.content}>
            <Picker
                data={driversData}
                cols={1}
                value={[distributeDrivers.drivers.value]}
                onOk={changeDrivers.bind(this, 'drivers')}
                itemStyle={{marginBottom: 5, marginTop: 5}}
              >
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={styles.font}>司机</Text>
                    <TextInput
                    style={[styles.input, {width: '55%'}]}
                    // onChangeText={text => onChangeText(text)}
                    value={distributeDrivers.drivers.label || '请选择'}
                    editable={false}/>
                    <Icon name='right'></Icon>
                  </View>
                </TouchableOpacity>
              </Picker>
          </View>
          <View style={styles.content}>
            <Picker
                data={carsData}
                cols={1}
                value={[distributeDrivers.cars.value]}
                onOk={changeDrivers.bind(this, 'cars')}
                itemStyle={{marginBottom: 5, marginTop: 5}}
              >
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={styles.font}>车牌</Text>
                    <TextInput
                    style={[styles.input, {width: '55%'}]}
                    value={distributeDrivers.cars.label || '请选择'}
                    editable={false}/>
                    <Icon name='right'></Icon>
                  </View>
                </TouchableOpacity>
              </Picker>
          </View>
          <View style={styles.content}>
            <Text style={styles.font}>处置单位</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value={companyInfo && companyInfo.disposal_company_name}
            />
          </View>
        </View>
      )
    }
  }
  const displayCompany = () => {
    if(edit) {
      return (
        displayEditor()
      )
    }else if(edit === false && type === 'WAITING_DRIVER' && company.user_type !== 'PARK') {
      return (
        displayEditor()
      )
    }else {
      return (
        noEditor
      )
    }
  }
  return (
    <View>
      <TitleInfo title='产废单位信息'/>
        <View style={styles.content}>
          <Text style={styles.font}>企业名称</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            editable={false}
            value={company.name}
          />
        </View>
        <View style={[styles.content, styles.border]}>
          <Text style={styles.font}>组织机构代码</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={company.organization_code }
            editable={false}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.font}>工商注册地址</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={company.address}
            editable={false}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.font}>负责人</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={company.se_contact_name}
            editable={false}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.font}>负责人联系电话</Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => onChangeText(text)}
            value={company.se_contact_phone}
            editable={false}
          />
        </View>
        { displayCompany() }
    </View>
  );
}

CompanyInfo.propTypes = {
  company: PropTypes.object,
  edit: PropTypes.bool,
  companyInfo: PropTypes.object,
  type: PropTypes.string
}

const styles = StyleSheet.create({
  content: {
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
});

export default CompanyInfo
