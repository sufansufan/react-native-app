/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppNavigator from "./js/pages/navigation/AppNavigator";
import Picker from './js/pages/components/Picker'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
