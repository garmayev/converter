import ConverterScreen from '../screens/ConverterScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faNewspaper, faUser, faCircleDot} from '@fortawesome/free-regular-svg-icons';
import React, {useState} from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import TabNavigation from './TabNavigation';
import {Linking, Text, View} from 'react-native';
import News from '../icons/News';
import CalendarScreen from '../screens/CalendarScreen';

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
                                Linking.openURL('https://gasgo.pro');
                            }}/>
            </View>
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigation({route, navigation}) {
    const Drawer = createDrawerNavigator();
    const {t} = useTranslation();
    const [initialRoute] = useState('ConverterScreen');

    return (
        <Drawer.Navigator initialRouteName={initialRoute}
                          backBehavior={'order'}
                          screenOptions={{
                              headerTitle: '',
                          }}
                          drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name={'Home'} component={ConverterScreen} options={{
                headerShown: true,
                headerTransparent: true,
                drawerLabel: t('Converter'),
                drawerIcon: ({}) => {
                    return (
                        <FontAwesomeIcon icon={faCircleDot} size={21}/>
                    );
                },
            }}/>
            <Drawer.Screen name={'TabNavigator'} component={TabNavigation} options={{
                headerShown: true,
                headerTransparent: true,
                drawerLabel: t('News'),
                drawerIcon: () => {
                    return (<FontAwesomeIcon icon={faNewspaper} size={21}/>);
                },
            }}/>
            <Drawer.Screen name={t('Calendar')} component={CalendarScreen} options={{
                headerShown: true,
                headerTransparent: false,
                headerTitle: t('Calendar'),
                drawerIcon: () => {
                    return (<FontAwesomeIcon icon={faCalendar} size={21}/>);
                },
            }}/>
        </Drawer.Navigator>
    );
}
