import NewsScreen from '../screens/NewsScreen';
import AdvScreen from '../screens/AdvScreen';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faNewspaper, faRectangleList} from '@fortawesome/free-regular-svg-icons';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import House from '../icons/House';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    const {t} = useTranslation();
    const iconSize = 25;

    return (

        // <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}>
        <Tab.Navigator initialRouteName={'News'}>
            <Tab.Screen name={'News'} component={NewsScreen} options={{
                tabBarIcon: () => (
                    <View style={{backgroundColor: '#fff', borderRadius: 30}}>
                        <House width={iconSize} height={iconSize} />
                    </View>
                    // <FontAwesomeIcon icon={faNewspaper} size={iconSize}/>
                ),
                tabBarIconStyle: styles.topBarIcon,
                tabBarLabel: t("News"),
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }} visible={true}/>
            <Tab.Screen name={t("Advertisements")} component={AdvScreen} options={{
                tabBarIcon: () => (
                    <FontAwesomeIcon icon={faRectangleList} size={iconSize}/>
                ),
                tabBarIconStyle: styles.topBarIcon,
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }} visible={true}/>
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
