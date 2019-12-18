import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { List, Modal, Provider  } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from "../components/NavBar";
const Item = List.Item;

const url = 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C185%2C700%2C462%3Bc0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4a46f83ddf43ad4bb2611c80bf32769e/d788d43f8794a4c2ee6be2b300f41bd5ac6e39d9.jpg'

export default class MyPage extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({focused}) => (
      focused ? <Image style={styles.tabBarIcon}  source={require('../../images/my_action.png')}/> :  <Image style={styles.tabBarIcon} source={require('../../images/my.png')}/>
    ),
  };
  constructor(props) {
    super(props)
    this.state = {
       userInfo: ''
    }
  }

  async componentDidMount() {
    let info = JSON.parse(await AsyncStorage.getItem('userInfo'))
    this.setState({
      userInfo: info
    })
  }
  onButtonClick = () => {
    Modal.alert('', '是否退出！', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      { text: '确定', onPress: () => {
        const {navigation} = this.props
        AsyncStorage.multiRemove(['userInfo'])
        navigation.replace('Login')
      } },
    ]);
  }
  render() {
    const { userInfo } = this.state
    return (
      <Provider>
        <SafeAreaView style={{ flex: 1}}>
          <View style={styles.container}>
            <NavBar {...this.props} hideLeft={true} hideRight={true} title='个人中心'></NavBar>
            <View style={styles.titleBox}>
              <View style={styles.titleImage}>
                <Image  style={{width: '100%', height: '100%', borderRadius: 5}} source={{uri: url}}></Image>
              </View>
              <View style={{ height: 60, justifyContent: 'center'}}>
                <Text style={styles.titleText}>用户名：{userInfo.name}</Text>
                <Text style={styles.phone}>联系电话：1387814123</Text>
              </View>
            </View>
            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
              <TouchableOpacity>
                <View style={styles.box}>
                  <View style={styles.images}>
                    <Image resizeMode={'contain'} style={{width: 20, height:20}} source={require('../../images/banben.png')}></Image>
                  </View>
                  <View style={styles.boxContent}>
                    <Text style={{fontSize: 20}}>版本号</Text>
                    <Text style={{fontSize: 20, color: '#999'}}>1.0.0</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.box}>
                  <View style={styles.images}>
                    <Image resizeMode={'contain'} style={{width: 20, height:20}} source={require('../../images/shuazi.png')}></Image>
                  </View>
                  <View style={styles.boxContent}>
                    <Text style={{fontSize: 20}}>清除缓存</Text>
                    {/* <Text style={{fontSize: 20, color: '#999'}}>1.0.0</Text> */}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onButtonClick}>
                <View style={styles.box}>
                  <View style={styles.images}>
                    <Image resizeMode={'contain'} style={{width: 20, height:20}} source={require('../../images/exit.png')}></Image>
                  </View>
                  <View style={styles.boxContent}>
                    <Text style={{fontSize: 20}}>退出登录</Text>
                    {/* <Text style={{fontSize: 20, color: '#999'}}>1.0.0</Text> */}
                  </View>
                </View>
              </TouchableOpacity>

              {/* <List>
                <Item wrap multipleLine onPress={() => {}}>
                  版本号
                </Item>
                <Item wrap multipleLine onPress={() => {}}>
                  清楚缓存
                </Item>
                <Item wrap multipleLine >
                  <TouchableOpacity onPress={this.onButtonClick}>
                    <Text style={{fontSize: 16}}>退出登录</Text>
                  </TouchableOpacity>
                </Item>
              </List> */}
            </View>
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFB'
  },
  tabBarIcon: {
    width: 21,
    height: 23,
  },
  titleBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  titleImage: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    marginRight: 20,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10,
  },
  box: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 20,
  },
  images: {
    marginRight: 10
  },
  boxContent: {
    flexDirection: 'row',
    width: '91%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingRight: 20,
  }
});
