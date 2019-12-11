import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, Toast } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import TitleInfo from './TitleInfo'
import PropTypes from 'prop-types'
import { getUploadImage } from "../../utils/api/orderManage";
import AsyncStorage from '@react-native-community/async-storage';
import NoData from './noData'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const SceneImage = (props) => {
  const { edit, imageInfo, title, id } = props
  const [imageList, setImageList] = useState([])
  // 选择图片
  const selectPhotoTapped = () => {
    const options = {
        title: '选择图片',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择照片',
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high',
        durationLimit: 10,
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
        angle: 0,
        allowsEditing: false,
        noData: false,
        storageOptions: {
          skipBackup: true,
          path: 'image'
        }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        const { fileName, fileSize, type, uri} = response
        const params = {
          uri,
          type,
          name: fileName,
          size: fileSize
        }
        if(title === '装运现场照片') {
          getUploadImage(params, `/orders/${id}/install_uploads`).then(({data: {install_images}}) => {
            setImageList(install_images)
          })
        }else if(title === '卸货现场图片') {
          getUploadImage(params, `/orders/${id}/uninstall_uploads`).then(({data: {uninstall_images}}) => {
            setImageList(uninstall_images)
          })
        }else {
          getUploadImage(params, '/orders/upload').then( async ({data}) => {
            if(data.error_code) {
              Toast.info(data.msg, 5)
            }else {
              await setImageList([...imageList, data])
              AsyncStorage.setItem('imageList', JSON.stringify([...imageList, data]))
            }
          })
        }
      }
    });
  }
  useEffect(() => {
    (async function () {
      if(edit && title !=='装运现场照片' && title !=='卸货现场照片') {
        if(AsyncStorage.getItem('imageList')) {
          let list = JSON.parse(await AsyncStorage.getItem('imageList'))
          setImageList(list || [])
        }
      }else {
        if(imageInfo) {
          setImageList(imageInfo)
        }
      }
    })()
  }, [imageInfo])
  return (
    <View>
      <TitleInfo title={title}/>
      <View style={styles.content}>
        { imageList.length ? imageList.map(item => (
          <View style={styles.imageBox} key={item.id}>
            <Image  style={{width: '100%', height: '100%'}} source={{uri: item.default}}></Image>
          </View>
        )) : edit ? null : <NoData/>}
        {edit ? ( <View style={styles.imageBox}>
          <TouchableOpacity onPress={selectPhotoTapped} style={{width: '100%', alignItems: 'center'}}>
            <Icon name='plus' size='lg'/>
          </TouchableOpacity>
        </View>) : null }
      </View>
    </View>
  );
}

SceneImage.propTypes = {
  edit: PropTypes.bool,
  imageInfo: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.string
}
SceneImage.defaultProps = {
  title: '现场照片'
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  imageBox: {
    width: '37%',
    height: 100,
    marginBottom: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SceneImage
