import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;

const url = 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C185%2C700%2C462%3Bc0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4a46f83ddf43ad4bb2611c80bf32769e/d788d43f8794a4c2ee6be2b300f41bd5ac6e39d9.jpg'

export default class MyPage extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({focused}) => (
      focused ? <Image style={styles.tabBarIcon} source={require('../../images/my_action.png')}/> :  <Image style={styles.tabBarIcon} source={require('../../images/my.png')}/>
    ),
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <View style={styles.titleImage}>
              <Image  style={{width: '100%', height: '100%'}} source={{uri: url}}></Image>
            </View>
            <View style={{ height: 80, justifyContent: 'center'}}>
              <Text style={styles.titleText}>苏凡</Text>
              <Text>17812341234</Text>
            </View>
          </View>
          <View>
            <List>
              <Item wrap multipleLine onPress={() => {}}>
                版本号
              </Item>
              <Item wrap multipleLine onPress={() => {}}>
                清楚缓存
              </Item>
              <Item wrap multipleLine onPress={() => {}}>
                退出登录
              </Item>
            </List>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  tabBarIcon: {
    width: 21,
    height: 21,
  },
  titleBox: {
    flexDirection: 'row',
    padding: 20,
  },
  titleImage: {
    width: 80,
    height: 80,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    marginRight: 20
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10,
  }
});
