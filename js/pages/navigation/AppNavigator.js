import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IndexPage from "../indexPage/index";
import OrderManage from "../orderManage/index";
import MyPage from "../myPage/index";
import Login from '../login/index'
import OrderDetails from '../orderManage/details'
import AddWaste from '../orderManage/addWaste'
import MessageDetails  from '../indexPage/details'
import ChangePasswordPage from "../myPage/password"


const BottomNavigator =  createMaterialBottomTabNavigator({
  Index: {screen: IndexPage},
  Order: { screen: OrderManage },
  My: { screen: MyPage }
},{
  activeColor: '#1296db',
  barStyle: {
    backgroundColor: '#fff',
    borderTopColor: "#e8e8e8",
    borderTopWidth: 0.5,
  }
})

export default createAppContainer(
  createStackNavigator({
    Login: {
      screen: Login
    },
    BottomNavigator: {
      screen: BottomNavigator
    },
    OrderDetails: {
      screen: OrderDetails
    },
    AddWaste: {
      screen: AddWaste
    },
    MessageDetails: {
      screen: MessageDetails
    },
    ChangePasswordPage: {
      screen: ChangePasswordPage
    }
  },{
    initialRouteName: 'BottomNavigator',
    headerMode: 'none',
    mode: 'card',
  })
);
