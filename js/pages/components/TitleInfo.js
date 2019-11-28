import React from 'react';
import {View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types'

const TitleInfo = (props) => {
  const { title } = props
  return (
    <View style={styles.title}>
      <Text style={{fontSize: 18}}>{title}</Text>
    </View>
  );
}

TitleInfo.propTypes = {
  title: PropTypes.string.isRequired
}
const styles = StyleSheet.create({
  title: {
    height: 50,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    paddingLeft: 10,
  }
});

export default TitleInfo
