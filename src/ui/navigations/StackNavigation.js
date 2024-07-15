import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import AdvScreen from '../screens/AdvScreen';
import NewsScreen from '../screens/NewsScreen';
import ViewNewsScreen from '../screens/ViewNewsScreen';
import {useTranslation} from 'react-i18next';

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
                <Stack.Screen name={t("News")} component={NewsScreen} options={{
                    cardShadowEnabled: true
                }} />
                <Stack.Screen name={"Advertisements"} component={AdvScreen} />
                <Stack.Screen name={"ViewNews"} component={ViewNewsScreen} options={{
                    headerShown: true,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    presentation: 'fullScreenModal'
                }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
