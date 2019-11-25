import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class MyPage extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../images/my_action.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../images/my.png')}/>
            );
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>我的中心</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});
