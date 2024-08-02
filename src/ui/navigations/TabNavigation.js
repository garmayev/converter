import NewsScreen from '../screens/NewsScreen';
import AdvScreen from '../screens/AdvScreen';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faNewspaper, faRectangleAd} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import MyTabBar from '../components/MyTabBar';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    const {t} = useTranslation();
    const iconSize = 25;
    return (

        <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}>
            <Tab.Screen name={'Home'} component={NewsScreen} options={{
                tabBarIcon: ({}) => (
                    <FontAwesomeIcon icon={faNewspaper} size={iconSize}/>
                ),
                tabBarIconStyle: styles.topBarIcon,
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }}/>
            <Tab.Screen name={t("Advertisements")} component={AdvScreen} options={{
                tabBarIcon: () => (
                    <FontAwesomeIcon icon={faRectangleAd} size={iconSize}/>
                ),
                tabBarIconStyle: styles.topBarIcon,
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    topBarIcon: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    topBarLabel: {
        fontSize: 16,
    },
});
