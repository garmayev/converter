import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import ViewNewsScreen from '../screens/ViewNewsScreen';
import {useTranslation} from 'react-i18next';
import CalendarScreen from '../screens/CalendarScreen';
import ViewEventScreen from '../screens/ViewEventScreen';
import TabNavigation from './TabNavigation';
import ViewAdvScreen from '../screens/ViewAdvScreen';
import {TransitionSpecs} from '@react-navigation/stack';

const config = {
    animation: 'switch',
    config: {
        stiffness: 1000000,
        damping: 500000,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.000001,
        restSpeedThreshold: 0.0000001,
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
                <Stack.Screen name={t("News")} component={TabNavigation} options={{
                    headerShown: true,
                }} />
                <Stack.Screen name={t("View News")} component={ViewNewsScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }} />
                <Stack.Screen name={t("View Adv")} component={ViewAdvScreen} options={{
                    headerShown: true,
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
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress
                            }
                        };
                    },
                    headerTitle: t('Event`s details'),
                    // presentation: 'fullScreenModal'
                }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
