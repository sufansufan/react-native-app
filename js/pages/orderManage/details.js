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
import { addOrder, getOrderDetails, submitDrivers, startDriver, finishDriver, agreeTransport } from '../../utils/api/orderManage'
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
          const {disposal_company_name, images, solid_waste:{items}, actions, company, driver_name, car_code, install_images, uninstall_images, quantity_burning, quantity_landfill, quantity_recyclable, review_status} = res
          setDetailsInfo(
            {
              companyInfo: {
                disposal_company_name,
                driver_name,
                car_code,
                quantity_burning,
                quantity_landfill,
                quantity_recyclable
              },
              wasteInfo: items,
              imageInfo: images,
              actions,
              install_images,
              uninstall_images,
              review_status
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
    }else if(params.type === 'WAITING_DRIVER' && userType !== 'ADMIN') {
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
    }else if(userType === 'ADMIN') {
      agreeTransport(params.id).then(res => {
        Toast.success('提交成功')
        navigation.navigate({routeName: 'BottomNavigator', state: {key: 'Order', routeName: 'Order'}})
        // navigation.goBack()
      })
    }
  }

  const addSubmit = async() =>{
    const companyInfo =JSON.parse(await AsyncStorage.getItem('CompanyInfo'))
    const wasteInfo = JSON.parse(await AsyncStorage.getItem('wasteInfo'))
    const imageList = JSON.parse(await AsyncStorage.getItem('imageList'))
    if(!imageList) {
      Toast.info('请添加图片', 5)
      return
    }
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
        Toast.success('新增成功', 5)
      }
      navigation.pop()
      AsyncStorage.multiRemove(['CompanyInfo', 'wasteInfo', 'imageList'])
    })
  }
  const driversubmit = async(id) => {
    const {drivers, cars} =JSON.parse(await AsyncStorage.getItem('distributeDrivers'))
    if(!drivers.value) {
      Toast.info('请选择司机', 5)
      return
    }
    if(!cars.value) {
      Toast.info('请选择车牌', 5)
      return
    }
    submitDrivers(id, {driver_id: drivers.value, car_id: cars.value}).then(res => {
      Toast.success('提交成功',5)
      navigation.pop()
      AsyncStorage.multiRemove(['distributeDrivers'])
    })
  }
  const displaySignResource = (userType, paramsType) => {
    if(userType === 'COMPANY' && !params.edit) {
      if(paramsType === 'END_REMOVE') {
        return (
          <>
            <SignInfo {...props} id={params.id}/>
          </>
        )
      }
      if(paramsType === 'FINISH') {
        return (
          <ResourceInfo  {...props} id={params.id} companyInfo={detailsInfo.companyInfo}/>
        )
      }
      if(paramsType === 'WAITING_DRIVER') {
        return null
      }
    }else if (userType === 'DISPOSAL') {
      return null
    }else {
      return (
        <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
      )
    }
    if(userType === 'DRIVER') {
      if(paramsType === 'CLEAN_REMOVE') {
        return (
          <>
            <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
            <SceneImage {...props} edit={true} title='装运现场照片'  imageInfo={detailsInfo.install_images} id={params.id}/>
          </>
        )
      }
      if(paramsType === 'START_REMOVE') {
        return (
          <>
            <SceneImage {...props} edit={params.edit}  imageInfo={detailsInfo.imageInfo}/>
            <SceneImage {...props} edit={false} title='装运现场照片'  imageInfo={detailsInfo.install_images} id={params.id}/>
            <SceneImage {...props} edit={true} title='卸货现场图片'  imageInfo={detailsInfo.uninstall_images} id={params.id}/>
          </>
        )
      }
    }
    // else {
    //   return (
    //     <>
    //       <SignInfo {...props} />
    //     </>
    //   )
    // }
  }
  const displayBtn = (params) => {
    if(userType === 'COMPANY' && params.type === 'WAITING_DRIVER'){
      return null
    }
    if(params.edit || userType === 'COMPANY' && params.type === 'WAITING_DRIVER' || userType === 'DISPOSAL' && params.type === 'WAITING_DRIVER') {
      return (
        <View style={styles.button} >
          <Button type='primary' onPress={submit.bind(this, params)}>提交</Button>
        </View>
      )
    }
    if(userType === 'DRIVER'){
      if(params.type === 'CLEAN_REMOVE') {
        return (
          <View style={styles.button} >
            <Button type='primary' onPress={submit.bind(this, params)}>开始清运</Button>
          </View>
        )
      }
      if(params.type === 'START_REMOVE') {
        return (
          <View style={styles.button} >
            <Button type='primary' onPress={submit.bind(this, params)}>结束清运</Button>
          </View>
        )
      }
    }
    if(userType === 'ADMIN' && detailsInfo.review_status === '未审核') {
      return (
        <View style={styles.button} >
          <Button type='primary' onPress={submit.bind(this, params)}>同意清运</Button>
        </View>
      )
    }
  }
  return (
      <Provider style={{height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView behavior='height' contentContainerStyle={styles.contentContainer}>
            <View style={{height: 20}}>
              <NavBar {...props} title='联单管理' pressLeft={pressLeft} hideRight={true} rightText={rightText} ></NavBar>
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
                { params.type !== 'WAITING_DRIVER' && detailsInfo.actions && detailsInfo.actions.can_cancel ? <CancelBtn id={params.id} {...props}/> : null}
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
