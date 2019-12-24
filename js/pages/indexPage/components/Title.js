import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const url = 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C185%2C700%2C462%3Bc0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4a46f83ddf43ad4bb2611c80bf32769e/d788d43f8794a4c2ee6be2b300f41bd5ac6e39d9.jpg'
const Title = () => {
  return (
    <View style={styles.titleBox}>
      {/* <View style={styles.titleLeft}>
        <View style={styles.titleLeftTop}>
          <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
        </View>
        <View style={styles.titleLeftBottom}>
        <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
        </View>
      </View> */}
      <View style={styles.titleRight}>
      <Image  style={{width: '100%', height: '100%'}} source={require('../../../images/home.png')}></Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleBox: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
  },
  titleLeft: {
    width: '40%',
    height: '100%',
  },
  titleLeftTop: {
    height: 120,
  },
  titleLeftBottom: {
    height: 120,
    marginTop: 10,
  },
  titleRight: {
    flex: 1,
    // marginLeft: 10,
  }
})

export default Title
