import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Provider, Button } from '@ant-design/react-native';
import NavBar from "../components/NavBar";
import CompanyInfo from "../components/CompanyInfo";
import ChangeInfo from '../components/ChangeInfo';
import SceneImage from '../components/SceneImage'
import SignInfo from '../components/SignInfo'
import ResourceInfo from '../components/ResourceInfo'

const Details = (props) => {
  const { navigation } = props
  pressLeft = () => {
    navigation.pop()
  }
  return (
      <Provider style={{height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView behavior='height' contentContainerStyle={styles.contentContainer}>
            <View style={{height: 20}}>
              <NavBar {...props} title='联单管理' pressLeft={pressLeft}></NavBar>
            </View>
            <View style={styles.scrollContainer}>
              <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <CompanyInfo {...props}/>
                  <ChangeInfo {...props}/>
                  <SceneImage {...props}/>
                  <SignInfo {...props} />
                  <ResourceInfo  {...props}/>
                </View>
                <View style={styles.button}>
                  <Button type='primary'>提交</Button>
                </View>
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
