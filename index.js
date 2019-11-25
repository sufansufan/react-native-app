/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppNavigator from "./js/pages/navigation/AppNavigator";
import Login from "./js/pages/login/index";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
