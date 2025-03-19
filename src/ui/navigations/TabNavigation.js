import NewsScreen from '../screens/NewsScreen';
import AdvScreen from '../screens/AdvScreen';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faNewspaper, faRectangleList} from '@fortawesome/free-regular-svg-icons';
import {useTranslation} from 'react-i18next';
import Newspaper from '../icons/Newspaper';
import Info from '../icons/Info';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    const {t} = useTranslation();
    const iconSize = 25;
    const dim = 20

    return (

        // <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}>
        <Tab.Navigator initialRouteName={'News'}>
            <Tab.Screen name={'News'} component={NewsScreen} options={{
                tabBarIcon: () => (
                    // <View style={{borderRadius: (iconSize + dim), height: iconSize + dim, width: iconSize + dim, ...styles.iconView}}>
                    //     <Newspaper height={iconSize} width={iconSize}/>
                    // </View>
                    <FontAwesomeIcon icon={faNewspaper} size={iconSize}/>
                ),
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#ccc',
                tabBarIconStyle: styles.topBarIcon,
                tabBarLabel: t('News'),
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }} visible={true}/>
            <Tab.Screen name={t('Advertisements')} component={AdvScreen} options={{
                tabBarIcon: () => (
                    // <View style={{borderRadius: iconSize + dim, height: iconSize + dim, width: iconSize + dim, ...styles.iconView}}>
                    //     <Info height={iconSize} width={iconSize}/>
                    // </View>
                    <FontAwesomeIcon icon={faRectangleList} size={iconSize}/>
                ),
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#ccc',
                tabBarIconStyle: styles.topBarIcon,
                headerShown: false,
                tabBarLabel: t('Advertisements'),
                tabBarLabelStyle: styles.topBarLabel,
            }} visible={true}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    iconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    topBarIcon: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    topBarLabel: {
        fontSize: 14,
    },
});
