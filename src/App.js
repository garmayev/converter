/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import './i18n/config';
import 'react-native-gesture-handler';
import CalculatorScreen from './ui/screens/CalculatorScreen';
import ConverterScreen from './ui/screens/ConverterScreen';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalculator, faArrowsRotate, faArrowsTurnToDots, faCogs, faUser} from '@fortawesome/free-solid-svg-icons';
import {AppRegistry as Navigation, Image, SafeAreaView, Text, View} from 'react-native';
import ReceiverScreen from './ui/screens/ReceiverScreen';
import SettingsScreen from './ui/screens/SettingsScreen';
import AboutScreen from './ui/screens/AboutScreen';
import {LogoText} from './ui/components/Logo';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const {t} = useTranslation();
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <DrawerItemList {...props} />
            </View>
            <View>
                <DrawerItem label={() => <Text style={{color: '#000'}}>{t('About us')}</Text>}
                            icon={() => <FontAwesomeIcon icon={faUser}/>}
                            onPress={() => {
                                props.navigation.navigate('AboutScreen');
                            }}/>
            </View>
        </DrawerContentScrollView>
    );
}

function App() {
    const {t} = useTranslation();
    const [initialRoute, setInitialRoute] = useState('ReceiverScreen');
    Navigation.registerComponent('SettingsScreen', () => SettingsScreen);
    Navigation.registerComponent('AboutScreen', () => AboutScreen);
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={initialRoute}
                              drawerContent={props => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name={'ReceiverScreen'} component={ReceiverScreen} options={{
                    title: t('Receiver'),
                    headerShown: true,
                    headerTransparent: true,
                    headerRight: () => <LogoText style={{
                        zIndex: 2,
                        minHeight: 50,
                        minWidth: 100,
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        elevation: 10,
                    }}/>,
                    drawerIcon: () => {
                        return (<FontAwesomeIcon icon={faArrowsTurnToDots}/>);
                    },
                }}/>
                {/*<Drawer.Screen name={t('Calculator')} component={CalculatorScreen} options={{*/}
                {/*    title: t('Calculator'),*/}
                {/*    drawerIcon: () => {*/}
                {/*        return (<FontAwesomeIcon icon={faCalculator}/>);*/}
                {/*    },*/}
                {/*}}/>*/}
                <Drawer.Screen name={'SettingsScreen'} component={SettingsScreen} options={{
                    drawerItemStyle: {display: 'none'},
                    headerShown: true,
                    headerTransparent: true,
                    headerRight: () => <LogoText style={{
                        zIndex: 2,
                        minHeight: 50,
                        minWidth: 100,
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        elevation: 10,
                    }}/>,
                }}/>
                <Drawer.Screen name={'AboutScreen'} component={AboutScreen}
                               options={{title: t('About us'), drawerItemStyle: {display: 'none'}}}/>
                <Drawer.Screen name={'ConverterScreen'} component={ConverterScreen} options={{
                    title: t('Converter'),
                    headerShown: true,
                    headerTransparent: true,
                    headerRight: () => <LogoText style={{
                        zIndex: 2,
                        minHeight: 50,
                        minWidth: 100,
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        elevation: 10,
                    }}/>,
                    drawerIcon: () => {
                        return (<FontAwesomeIcon icon={faArrowsRotate}/>);
                    },
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;
