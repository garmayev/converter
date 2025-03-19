/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './i18n/config';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackNavigation from './ui/navigations/StackNavigation';
import {StatusBar} from 'react-native';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar
                    backgroundColor={"#1b3f63"} />
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
