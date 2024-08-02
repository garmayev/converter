import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import AdvScreen from '../screens/AdvScreen';
import NewsScreen from '../screens/NewsScreen';
import ViewNewsScreen from '../screens/ViewNewsScreen';
import {useTranslation} from 'react-i18next';
import CalendarScreen from '../screens/CalendarScreen';
import ViewEventScreen from '../screens/ViewEventScreen';
import TabNavigation from './TabNavigation';
import ViewAdvScreen from '../screens/ViewAdvScreen';

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export default function StackNavigation() {
    const Stack = createNativeStackNavigator()
    const {t} = useTranslation();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Group>
                <Stack.Screen name={"Converter"} component={DrawerNavigation} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={t("News")} component={TabNavigation} />
                <Stack.Screen name={t("View News")} component={ViewNewsScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    presentation: 'fullScreenModal'
                }} />
                <Stack.Screen name={t("View Adv")} component={ViewAdvScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    presentation: 'fullScreenModal'
                }} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={t("Calendar")} component={CalendarScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    presentation: 'fullScreenModal'
                }} />
                <Stack.Screen name={"ViewEvent"} component={ViewEventScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    headerTitle: t('Event`s details'),
                    presentation: 'fullScreenModal'
                }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
