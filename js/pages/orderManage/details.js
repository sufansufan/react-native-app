import React, { useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Provider, Button, Toast } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from "../components/NavBar";
import CompanyInfo from "../components/CompanyInfo";
import ChangeInfo from '../components/ChangeInfo';
import SceneImage from '../components/SceneImage'
import SignInfo from '../components/SignInfo'
import ResourceInfo from '../components/ResourceInfo'
import { addOrder, getOrderDetails, submitDrivers, startDriver, finishDriver } from '../../utils/api/orderManage'
import CancelBtn from './components/cancelBtn'


const Details = (props) => {
  const { navigation } = props
  const { state:{ params } } = navigation
  const [rightText, setRightText] = useState('')
  const [company, setCompany] = useState({})
  const [userType, setUserType] = useState('')
  const [detailsInfo, setDetailsInfo] = useState({})
  useEffect(() => {
    if(params) {
      setRightText(params.navRightText)
    }
  }, [])
  const pickerData = [
    {
      value: '1',
      label: '分配司机'
    },
    {
      value: '2',
      label: '签收'
    },
    {
      value: '3',
      label: '资源化信息上报'
    }
  ]
  const pressLeft = () => {
    navigation.pop()
  }
  useEffect(()=>{
    (async function () {
      let { company, user_type } = JSON.parse(await AsyncStorage.getItem('userInfo'))
      setUserType(user_type)
      setCompany({...company, user_type})
      if(!params.edit) {
        getOrderDetails(params.id).then((res) => {
          console.log(res)
          const {disposal_company_name, images, solid_waste:{items}, actions, company, driver_name, car_code, install_images, uninstall_images} = res
          setDetailsInfo(
            {
              companyInfo: {
                disposal_company_name,
                driver_name,
                car_code
              },
              wasteInfo: items,
              imageInfo: images,
              actions,
              install_images,
              uninstall_images
            }
          )
          setCompany({...company, user_type})
        })
      }
    })()
    // return () => {
    //   AsyncStorage.multiRemove(['CompanyInfo', 'wasteInfo', 'imageList'])
    // }
  }, [])
  const submit = (params) => {
    if(params.edit) {
      addSubmit()
    }else if(params.type === 'WAITING_DRIVER') {
      driversubmit(params.id)
    }else if(params.type === 'CLEAN_REMOVE') {
      startDriver(params.id).then(res => {
        Toast.success('开始清运')
        navigation.pop()
      })
    }else if(params.type === 'START_REMOVE') {
      finishDriver(params.id).then(res => {
        Toast.success('结束清运')
        navigation.pop()
      })
    }
  }

  const addSubmit = async() =>{
    const companyInfo =JSON.parse(await AsyncStorage.getItem('CompanyInfo'))
    const wasteInfo = JSON.parse(await AsyncStorage.getItem('wasteInfo'))
    const imageList = JSON.parse(await AsyncStorage.getItem('imageList'))
    let ids = []
    imageList.length && imageList.forEach(item => {
      ids.push(item.id)
    });
    const params = {
      disposal_company_id: companyInfo.value,
      disposal_company_name: companyInfo.label,
      images_ids: ids,
      solid_waste: {
        items: wasteInfo
      }
    }
    addOrder(params).then(res => {
      if(res.msg) {
        Toast.info(res.msg)
      }else {
        Toast.success('新增成功')
      }
      AsyncStorage.multiRemove(['CompanyInfo', 'wasteInfo', 'imageList'])
    })
  }
  const driversubmit = async(id) => {
    const {drivers, cars} =JSON.parse(await AsyncStorage.getItem('distributeDrivers'))
    if(!drivers.value) {
      Toast.info('请选择司机')
      return
    }
    if(!cars.value) {
      Toast.info('请选择车牌')
      return
    }
    submitDrivers(id, {driver_id: drivers.value, car_id: cars.value}).then(res => {
      Toast.success('提交成功')
      navigation.pop()
      AsyncStorage.multiRemove(['distributeDrivers'])
    })
  }
  const displaySignResource = (userType, paramsType) => {
    if(userType === 'COMPANY'){
      return (
        <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
      )
    }else if (paramsType === 'WAITING_DRIVER') {
      return null
    }else if (paramsType === 'CLEAN_REMOVE') {
      return (
        <>
          <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
          <SceneImage {...props} edit={true} title='装运现场照片'  imageInfo={detailsInfo.install_images} id={params.id}/>
        </>
      )
    }else if(paramsType === 'START_REMOVE'){
      return (
        <>
          <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
          <SceneImage {...props} edit={false} title='装运现场照片'  imageInfo={detailsInfo.install_images} id={params.id}/>
          <SceneImage {...props} edit={true} title='卸货现场图片'  imageInfo={detailsInfo.uninstall_images} id={params.id}/>
        </>
      )
    }else if(paramsType === 'END_REMOVE') {
      return (
        <>
          <SignInfo {...props} id={params.id}/>
        </>
      )
    }else {
      return (
        <>
          <SignInfo {...props} />
          <ResourceInfo  {...props}/>
        </>
      )
    }
  }
  const displayBtn = (params) => {
    if(params.edit || params.type === 'WAITING_DRIVER') {
      return (
        <View style={styles.button} >
          <Button type='primary' onPress={submit.bind(this, params)}>提交</Button>
        </View>
      )
    }else if(params.type === 'CLEAN_REMOVE') {
      return (
        <View style={styles.button} >
          <Button type='primary' onPress={submit.bind(this, params)}>开始清运</Button>
        </View>
      )
    }else if(params.type === 'START_REMOVE') {
      return (
        <View style={styles.button} >
          <Button type='primary' onPress={submit.bind(this, params)}>结束清运</Button>
        </View>
      )
    }

  }
  return (
      <Provider style={{height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView behavior='height' contentContainerStyle={styles.contentContainer}>
            <View style={{height: 20}}>
              <NavBar {...props} title='联单管理' pressLeft={pressLeft} pickerData={pickerData} hideRight={true} rightText={rightText} ></NavBar>
            </View>
            <View style={styles.scrollContainer}>
              <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <CompanyInfo {...props} company={company} edit={params.edit} companyInfo={detailsInfo.companyInfo} type={params.type} />
                  <ChangeInfo {...props} edit={params.edit} wasteInfo={detailsInfo.wasteInfo}/>
                  {displaySignResource(userType, params.type)}
                </View>
                  {displayBtn(params)}
                {detailsInfo.actions && detailsInfo.actions.can_cancel ? <CancelBtn id={params.id} {...props}/> : null}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: '93%',
    marginTop: 30,
  },
  contentContainer: {
    height: '100%',
  },
  button: {
    width: '80%',
    marginTop: 50,
    marginBottom: 70,
    marginLeft: '10%'
  }
});

export default Details
