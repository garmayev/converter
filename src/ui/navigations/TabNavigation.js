import NewsScreen from '../screens/NewsScreen';
import AdvScreen from '../screens/AdvScreen';
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faNewspaper, faRectangleAd} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import News from '../icons/News';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    const {t} = useTranslation();
    const iconSize = 25;
    return (
        <Tab.Navigator>
            <Tab.Screen name={t('News')} component={NewsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <FontAwesomeIcon icon={faNewspaper} size={iconSize} />
                ),
                tabBarIconStyle: styles.topBarIcon,
                headerShown: false,
                tabBarLabelStyle: styles.topBarLabel,
            }}/>
            <Tab.Screen name={t('Advertisements')} component={AdvScreen} options={{
                tabBarIcon: () => (
                    <FontAwesomeIcon icon={faRectangleAd} size={iconSize} />
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
