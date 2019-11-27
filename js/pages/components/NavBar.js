import React from 'react';
import {View, Text, Image, StatusBar, StyleSheet, TouchableOpacity  } from 'react-native';
import PropTypes from "prop-types"

const NavBar = (props) => {
  const { hideLeft, hideRight, pressLeft, pressRight, title} = props
  return (
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
        {hideRight ? null : (<TouchableOpacity onPress={pressRight}>
           <View style={styles.left}>
             <Image style={styles.image} source={require('../../images/ellipsis.png')} />
           </View>
         </TouchableOpacity>)}
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
}

NavBar.defaultProps = {
  hideLeft: false,
  hideRight: false
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#e8e8e8",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  tilte: {
    fontSize: 18
  },
  image: {
    width: 20,
    height: 25
  },
  left: {
    flexDirection: 'row',
  }
})

export default NavBar
