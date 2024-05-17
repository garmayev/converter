/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    LoginScreen,
    RegisterScreen,
    DashboardScreen,
    AboutScreen,
    ProfileScreen,
    SettingsScreen,
    ViewScreen,
    CalculatorScreen
} from './ui/screens';
import './i18n/config';
import PreloaderScreen from './ui/screens/PreloaderScreen';
import {View} from 'react-native';

const Stack = createStackNavigator();

function App() {
    const [state, setState] = useState(false);
    const [initialRoute, setInitialRoute] = useState('CalculatorScreen');

    useEffect(() => {
        setTimeout(() => {
            setState(true)
        }, 2000)
    }, [])

    if ( state ) {
        return (
            <Provider>
                <NavigationContainer independent={true}>
                    <Stack.Navigator
                        initialRouteName={initialRoute}
                        screenOptions={{headerShown: false}}
                    >
                        <Stack.Screen name={'ViewScreen'} component={ViewScreen} initialParams={{orderId: 366}}/>
                        <Stack.Screen name={'AboutScreen'} component={AboutScreen}/>
                        <Stack.Screen name={'LoginScreen'} component={LoginScreen}/>
                        <Stack.Screen name={'ProfileScreen'} component={ProfileScreen}/>
                        <Stack.Screen name={'SettingsScreen'} component={SettingsScreen}/>
                        <Stack.Screen name={'RegisterScreen'} component={RegisterScreen}/>
                        <Stack.Screen name={'DashboardScreen'} component={DashboardScreen}/>
                        <Stack.Screen name={'CalculatorScreen'} component={CalculatorScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    } else {
        return (
            <View style={{
                flex: 1,
                padding: 10,
                alignItems: 'center',
            }}>
                <PreloaderScreen />
            </View>
        )
    }
}

export default App;
