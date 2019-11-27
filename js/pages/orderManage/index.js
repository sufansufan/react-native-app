import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "../components/NavBar";
import { List } from '@ant-design/react-native';
import ListItem from './components/List'

export default class OrderManage extends Component {
    constructor(props) {
      super(props)
    }
    static navigationOptions = {
        tabBarLabel: '联单管理',
        tabBarIcon: ({focused}) => (
            focused ? <Image style={styles.tabBarIcon} source={require('../../images/list_action.png')}/> :  <Image style={styles.tabBarIcon} source={require('../../images/list.png')}/>
        )
    };
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <NavBar {...this.props} hideLeft={true} title='联单管理'></NavBar>
                    <ScrollView
                        style={{ flex: 1 }}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <List>
                            <ListItem {...this.props}></ListItem>
                        </List>
                    </ScrollView>
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
  }
});
