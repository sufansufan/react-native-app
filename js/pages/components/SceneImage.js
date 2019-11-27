import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import TitleInfo from './TitleInfo'

const url = 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C185%2C700%2C462%3Bc0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4a46f83ddf43ad4bb2611c80bf32769e/d788d43f8794a4c2ee6be2b300f41bd5ac6e39d9.jpg'

const SceneImage = (props) => {
  return (
    <View>
      <TitleInfo title='现场图片'/>
      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
        </View>
        <View style={styles.imageBox}>
          <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
        </View>
        <View style={styles.imageBox}>
          <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 30,
  },
  imageBox: {
    width: 160,
    height: 100,
    marginBottom: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  }
});

export default SceneImage
