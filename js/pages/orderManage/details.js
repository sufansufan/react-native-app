import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NavBar from "../components/NavBar";
import CompanyInfo from "../components/CompanyInfo";
import ChangeInfo from '../components/ChangeInfo';
import SceneImage from '../components/SceneImage'

const Details = (props) => {
  const { navigation } = props
  pressLeft = () => {
    navigation.pop()
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <NavBar {...props} title='联单管理' pressLeft={pressLeft}></NavBar>
          <CompanyInfo {...props}/>
          <ChangeInfo {...props}/>
          <SceneImage {...props}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default Details
