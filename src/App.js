/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './i18n/config';
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerNavigation from './ui/navigations/DrawerNavigation';
import StackNavigation from './ui/navigations/StackNavigation';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
