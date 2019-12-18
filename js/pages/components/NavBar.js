import React, { useState } from 'react';
import {View, Text, Image, StatusBar, StyleSheet, TouchableOpacity  } from 'react-native';
import { Picker } from '@ant-design/react-native';
import PropTypes from "prop-types"

const NavBar = (props) => {
  const { hideLeft, hideRight, pressLeft, pressRight, title, pickerData, pickerChange} = props
  return (
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#5ab0ff" barStyle="light-content" /> */}
        <View style={styles.left}>
          {hideLeft ? null : (<TouchableOpacity onPress={pressLeft}>
            <View style={styles.left}>
              <Image style={styles.image} source={require('../../images/back.png')} />
              <Text style={{fontSize:16}}>返回</Text>
            </View>
          </TouchableOpacity>)}
        </View>
        <View>
          <Text style={[styles.tilte]}>{title}</Text>
        </View>
        <View style={styles.left}>
            {hideRight ? null : (
              <Picker
                data={pickerData}
                cols={1}
                onOk={pickerChange}
                itemStyle={{marginBottom: 5, marginTop: 5}}
              >
                <TouchableOpacity>
                  <View style={styles.left}>
                    <Image style={styles.image} source={require('../../images/ellipsis.png')} />
                  </View>
                </TouchableOpacity>
              </Picker>
          )}
        </View>
      </View>
  )
}
NavBar.propTypes = {
  hideLeft: PropTypes.bool,
  hideRight: PropTypes.bool,
  pressLeft: PropTypes.func,
  pressRight:  PropTypes.func,
  title: PropTypes.string,
  pickerData: PropTypes.array,
  pickerChange: PropTypes.func,
}

NavBar.defaultProps = {
  hideLeft: false,
  hideRight: false,
  rightText: ''
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  tilte: {
    fontSize: 18,
    marginLeft: -10,
  },
  image: {
    width: 15,
    height: 18,
    marginTop: 1
  },
  left: {
    flexDirection: 'row',
    minWidth: 20,
  }
})

export default NavBar
