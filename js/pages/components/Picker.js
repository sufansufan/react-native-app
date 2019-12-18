import React from 'react';
import { View, Text } from 'react-native';
import ScrollableTabView,{ DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
export default class BasicModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  render() {
    return (
      <ScrollableTabView
      style={{width: '100%',}}
      tabBarPosition='top'//tabBarPosition默认top  位于屏幕顶部   bottom位于屏幕底部  overlayTop悬浮在顶部
      initialPage={0} //初始化时被选中的Tab下标，默认是0
      locked={false}//表示手指是否能拖动视图  默认false  true则不能拖动,只可点击
      renderTabBar={() => <ScrollableTabBar />}
      tabBarUnderlineStyle={{backgroundColor: ''}}//设置DefaultTabBar和ScrollableTabBarTab选中时下方横线的颜色
      tabBarBackgroundColor='#FFFFFF'//设置整个Tab这一栏的背景颜色
      tabBarActiveTextColor='#1C8BC1'//设置选中Tab的文字颜色
      tabBarInactiveTextColor='#7A67EE'//设置未选中Tab的文字颜色
      tabBarTextStyle={{fontSize: 18}}//设置Tab文字的样式
      onChangeTab={(obj) => {//Tab切换之后会触发此方法
        console.log('index:' + obj.i);
      }}
      onScroll={(postion) => {  //视图正在滑动的时候触发此方法
        // float类型 [0, tab数量-1]
        console.log('scroll position:' + postion);
      }}
  >
      <View tabLabel='Tab1'>
          <Text>Tab1</Text>
      </View>
      <View tabLabel='Tab2'>
          <Text>Tab2</Text>
      </View>
  </ScrollableTabView>
    )
  }
}
