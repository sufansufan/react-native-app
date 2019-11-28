import React, { useState } from 'react';
import {View, Text, Image, StatusBar, StyleSheet, TouchableOpacity  } from 'react-native';
import { Picker, Provider } from '@ant-design/react-native';
import PropTypes from "prop-types"

const NavBar = (props) => {
  const { hideLeft, hideRight, pressLeft, pressRight, title} = props
  const pickerData= [
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
  const onChange = (value) => {
    cosnole.log(value)
  }
  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar backgroundColor="#5ab0ff" barStyle="light-content" />
        <View>
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
        <View>
          {hideRight ? null : (
              <Picker
                data={pickerData}
                cols={1}
                onChange={onChange}
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
    </Provider>

  )
}
NavBar.propTypes = {
  hideLeft: PropTypes.bool,
  hideRight: PropTypes.bool,
  pressLeft: PropTypes.func,
  pressRight:  PropTypes.func,
  title: PropTypes.string,
}

NavBar.defaultProps = {
  hideLeft: false,
  hideRight: false
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    top: 0,
    left: 0,
  },
  tilte: {
    fontSize: 18
  },
  image: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  left: {
    flexDirection: 'row',
  }
})

export default NavBar
