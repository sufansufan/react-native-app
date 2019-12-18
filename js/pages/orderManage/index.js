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
            orderList: [],
            pickerValue: '',
            page: 1,
            pageCount: null,
            showFoot: 0,
            isLoading: true,
            isRefreshing: false
        }
        this.pickerChange = (value) => {
            const { navigation } = this.props
            const {userType} = this.state
            this.setState({
                pickerValue: value[0],
            })
            if(userType==='COMPANY') {
                if(value[0]==='add'){
                    navigation.navigate({routeName: 'OrderDetails', params: {userType, edit: true,}})
                }else {
                    this.setState({
                        orderList: []
                    })
                    this.fetchOrderList(value[0], '' , '0')

                }
            }else if(userType==='DISPOSAL') {
                this.setState({
                    orderList: []
                })
                this.fetchOrderList(value[0], '', '0')

                // if(value[0]==='WAITING_DRIVER'){
                //     navigation.navigate({routeName: 'OrderDetails', params: {userType, edit: true, type: 'WAITING_DRIVER'}})
                // }
            }
        }
    }

    static navigationOptions = {
        tabBarLabel: '联单管理',
        tabBarIcon: ({focused}) => (
            focused ? <Image style={styles.tabBarIcon} resizeMode={'cover'} source={require('../../images/list_action.png')}/> :  <Image style={styles.tabBarIcon} source={require('../../images/list.png')}/>
        )
    };

    fetchOrderList(status, type, page) {
        var id = ''
        if(this.state.userInfo.company) {
            id = this.state.userInfo.company.id
        }
        const params = {
            page: this.state.page,
            company_id: id || '',
            status,
        }
        if(type === 'down') {
            params.page = 0
            this.setState({
                page: 1
            })
        }
        if(page) {
            params.page = 1
        }
        getOrderList(params).then((res) => {
            let {orders, total_count} = res
            let pageCount = Math.floor(total_count/20) + 1
            this.setState({
                pageCount,
                page: this.state.page += 1,
                showFoot: 0,
            })

            const { orderList } = this.state
            this.setState({
                orderList: [...orderList,...orders]
            })
        })
    }
    getOrderListFromList(type) {
        if(type === 'down') {
            this.setState({
                isRefreshing: false,
                orderList: []
            })
            this.fetchOrderList(this.state.pickerValue || 'ALL' , 'down')
        }else {
            const { pageCount, page } = this.state
            if(page <= pageCount) {
                this.setState({
                    showFoot: 2
                })
                this.fetchOrderList(this.state.pickerValue || 'ALL')
            }else {
                this.setState({
                    showFoot: 1
                })
            }
        }
    }
    componentDidMount() {
        (async function () {
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
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <Provider>
                        <NavBar {...this.props} hideLeft={true} title='联单管理' pickerData={this.state.pickerData} pickerChange={this.pickerChange} hideRight={this.state.userType ==='DRIVER' ? true : false}></NavBar>
                        <View style={styles.scrollContainer}>
                            <ListItem {...this.props} orderList={this.state.orderList} getOrderListFromList={this.getOrderListFromList.bind(this)} showFoot={this.state.showFoot} isRefreshing={this.state.isRefreshing}></ListItem>
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
    width: 40,
    height: 22,
  },
  scrollContainer: {
    height: '93%',
  }
});
