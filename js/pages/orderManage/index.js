import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, SafeAreaView  } from 'react-native';
import NavBar from "../components/NavBar";
import { List, Provider } from '@ant-design/react-native';
import ListItem from './components/List'
import AsyncStorage from '@react-native-community/async-storage';
import { getOrderList } from '../../utils/api/orderManage'


export default class OrderManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerData: [],
            userType: '',
            userInfo: {},
            orderList: []
        }
        this.pickerChange = (value) => {
            const { navigation } = this.props
            const {userType} = this.state
            if(userType==='COMPANY') {
                if(value[0]==='add'){
                    navigation.navigate({routeName: 'OrderDetails', params: {userType, edit: true,}})
                }else {
                    this.fetchOrderList(value[0])
                }
            }else if(userType==='DISPOSAL') {
                this.fetchOrderList(value[0])

                // if(value[0]==='WAITING_DRIVER'){
                //     navigation.navigate({routeName: 'OrderDetails', params: {userType, edit: true, type: 'WAITING_DRIVER'}})
                // }
            }
        }
    }

    static navigationOptions = {
        tabBarLabel: '联单管理',
        tabBarIcon: ({focused}) => (
            focused ? <Image style={styles.tabBarIcon} source={require('../../images/list_action.png')}/> :  <Image style={styles.tabBarIcon} source={require('../../images/list.png')}/>
        )
    };


    fetchOrderList(status) {
        var id = ''
        if(this.state.userInfo.company) {
            id = this.state.userInfo.company.id
        }
        const params = {
            page: 1,
            company_id: id || '',
            status,
        }
        getOrderList(params).then(({orders}) => {
            console.log(orders)
            this.setState({
                orderList: orders
            })
        })
    }
    componentDidMount() {
        (async function () {
            console.log(JSON.parse(await AsyncStorage.getItem('userInfo')), 999999)
            let userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
            const { user_type } = userInfo
            this.setState({
                userType: user_type,
                userInfo,
            })
            this.fetchOrderList('ALL')
            switch (user_type) {
                case 'COMPANY':
                    this.setState({
                        pickerData: [
                            {
                                value: 'add',
                                label: '新建联单'
                            },
                            {
                            value: 'IN_PROGRESS',
                            label: '未完成'
                            },
                            {
                            value: 'COMPLETED',
                            label: '已完成'
                            }
                        ]
                    })
                    break;
                case 'DISPOSAL':
                    this.setState({
                        pickerData: [
                            {
                                value: 'WAITING_DRIVER',
                                label: '待分配司机'
                            },
                            {
                            value: 'IN_PROGRESS',
                            label: '未完成'
                            },
                            {
                            value: 'COMPLETED',
                            label: '已完成'
                            }
                        ]
                    })
                    break;
                default:
                    break;
            }
        }).apply(this)
        const { navigation } = this.props
        console.log(navigation)
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <Provider>
                        <NavBar {...this.props} hideLeft={true} title='联单管理' pickerData={this.state.pickerData} pickerChange={this.pickerChange} hideRight={this.state.userType ==='DRIVER' ? true : false}></NavBar>
                        <View style={styles.scrollContainer}>
                            <ScrollView
                                automaticallyAdjustContentInsets={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >

                                <ListItem {...this.props} orderList={this.state.orderList}></ListItem>
                            </ScrollView>
                        </View>
                    </Provider>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabBarIcon: {
    width: 21,
    height: 21,
  },
  scrollContainer: {
    height: '93%',
  }
});
