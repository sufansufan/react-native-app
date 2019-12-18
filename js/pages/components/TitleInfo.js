import React from 'react';
import {View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types'

const TitleInfo = (props) => {
  const { title } = props
  return (
    <View style={styles.title}>
      <Text style={{fontSize: 16, color: '#999999'}}>{title}</Text>
    </View>
  );
}

TitleInfo.propTypes = {
  title: PropTypes.string.isRequired
}
const styles = StyleSheet.create({
  title: {
    height: 44,
    backgroundColor: '#FAFAFB',
    justifyContent: 'center',
    paddingLeft: 15,
  }
});

export default TitleInfo
