import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import {useTranslation} from 'react-i18next';
import ViewEventScreen from '../screens/ViewEventScreen';
import RemainderViewScreen from '../screens/RemainderViewScreen';
import ViewNewsScreen from '../screens/ViewNewsScreen';
import ViewAdvScreen from '../screens/ViewAdvScreen';

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

const Stack = createNativeStackNavigator();
const Modal = createNativeStackNavigator();

function ModalNavigation() {
    return (
        <Modal.Navigator mode={"modal"}>
            <Modal.Screen name="ViewEvent" component={ViewEventScreen} options={{
                headerLeft: null,
                presentation: 'modal',
            }}/>
        </Modal.Navigator>
    );
}

export default function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name={'Converter'} component={DrawerNavigation} />
            <Stack.Screen name={'modal'} component={ModalNavigation} options={{
                headerShown: false
            }} />
            <Stack.Screen name={'remainderView'} component={RemainderViewScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name={'ViewNews'} component={ViewNewsScreen} options={{
                headerShown: true,
            }} />
            <Stack.Screen name={'ViewAdv'} component={ViewAdvScreen} options={{
                headerShown: true,
            }} />
        </Stack.Navigator>
    );
}
