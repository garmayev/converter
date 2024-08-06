import TestScreen from '../screens/TestScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAd, faArrowsTurnToDots, faNewspaper, faUser} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import TabNavigation from './TabNavigation';
import {Image, Linking, Text, View} from 'react-native';
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
    const [initialRoute] = useState('TestScreen');

    return (
        <Drawer.Navigator initialRouteName={initialRoute}
                          backBehavior={'order'}
                          screenOptions={{
                              headerTitle: '',
                          }}
                          drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Group>
                <Drawer.Screen name={t('Converter')} component={TestScreen} options={{
                    headerShown: true,
                    headerTransparent: true,
                    drawerIcon: ({}) => {
                        return (
                            <FontAwesomeIcon icon={faArrowsTurnToDots} size={21} />
                            // <View>
                            //     <Image
                            //         source={require('../../assets/convert-icon.png')}
                            //         icon={faArrowsTurnToDots}
                            //         size={25}/>
                            // </View>
                        );
                    },
                }}/>
            </Drawer.Group>
            {/*<Drawer.Group>*/}
            {/*    <Drawer.Screen name={t('News')} component={TabNavigation} options={{*/}
            {/*        headerShown: true,*/}
            {/*        headerTransparent: false,*/}
            {/*        headerTitle: t('News'),*/}
            {/*        drawerIcon: () => {*/}
            {/*            return (<FontAwesomeIcon icon={faNewspaper} size={21} />);*/}
            {/*        },*/}
            {/*    }}/>*/}
            {/*</Drawer.Group>*/}
            {/*<Drawer.Group>*/}
            {/*    <Drawer.Screen name={t('Calendar')} component={CalendarScreen} options={{*/}
            {/*        headerShown: true,*/}
            {/*        headerTransparent: false,*/}
            {/*        headerTitle: t('Calendar'),*/}
            {/*        drawerIcon: () => {*/}
            {/*            return (<FontAwesomeIcon icon={faNewspaper} size={21} />);*/}
            {/*        },*/}
            {/*    }} />*/}
            {/*</Drawer.Group>*/}
        </Drawer.Navigator>
    );
}
