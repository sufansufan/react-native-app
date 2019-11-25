import React from 'react';
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IndexPage from "../indexPage/index";
import OrderManage from "../orderManage/index";
import MyPage from "../myPage/index";


export default createAppContainer(
  createMaterialBottomTabNavigator({
    Index: {screen: IndexPage},
    Order: { screen: OrderManage },
    My: { screen: MyPage }
  },{
    activeColor: '#1296db',
    barStyle: {
      backgroundColor: '#fff'
    }
  })
);
