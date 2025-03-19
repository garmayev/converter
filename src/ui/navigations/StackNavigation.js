import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import ViewEventScreen from '../screens/ViewEventScreen';
import RemainderViewScreen from '../screens/RemainderViewScreen';
import ViewNewsScreen from '../screens/ViewNewsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ConverterScreen from '../screens/ConverterScreen';
import ValueScreen from '../screens/ValueScreen';
import CalendarScreen from '../screens/CalendarScreen';
import {useState} from 'react';
import TabNavigation from "./TabNavigation";
import ViewAdvScreen from "../screens/ViewAdvScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    const [filter, setFilter] = useState(false);
    const {t} = useTranslation();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            {/*<Stack.Screen name={'Converter'} component={DrawerNavigation} />*/}
            {/*<Stack.Screen name={'modal'} component={ModalNavigation} options={{*/}
            {/*    headerShown: false*/}
            {/*}} />*/}
            <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name={'ConverterScreen'} component={ConverterScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerStyle: {
                    color: '#fff',
                    height: 20
                },
                headerBackTitle: t('Back'),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name={'ValueScreen'} component={ValueScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerStyle: {
                    color: '#fff',
                    height: 20
                },
                headerBackTitle: '',
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name={'NewsScreen'} options={{
                headerShown: true,
                headerTransparent: false,
                headerTitle: t('News'),
                headerStyle: {
                    backgroundColor: '#1b3f63',
                    color: '#fff',
                    height: 20,
                    textAlign: 'center',
                },
                headerBackTitle: t('Back'),
                headerTintColor: '#fff',
            }}>
                {props => <TabNavigation />}
                {/*{props => <NewsScreen {...props} isFilter={filter} setFilter={setFilter} />}*/}
            </Stack.Screen>
            <Stack.Screen name={'CalendarScreen'} component={CalendarScreen} options={{
                headerShown: true,
                headerTransparent: false,
                headerTitle: t('Calendar'),
                headerStyle: {
                    backgroundColor: '#1b3f63',
                    color: '#fff',
                    height: 20,
                    elevation: 0,
                },
                headerBackTitle: t('Back'),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name={'remainderView'} component={RemainderViewScreen} options={{
                headerBackTitle: t('Back'),
                headerShown: true,
            }} />
            <Stack.Screen name={'ViewNews'} component={ViewNewsScreen} options={{
                headerShown: true,
                headerTransparent: false,
                headerStyle: {
                    backgroundColor: '#1b3f63',
                    color: '#fff',
                    height: 20
                },
                headerBackTitle: t('Back'),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name={'ViewEvent'} component={ViewEventScreen} options={{
                headerBackTitle: t('Back'),
                headerShown: true,
            }} />
            <Stack.Screen name={'ViewAdv'} component={ViewAdvScreen} options={{
                headerShown: true,
                headerTransparent: false,
                headerStyle: {
                    backgroundColor: '#1b3f63',
                    color: '#fff',
                    height: 20
                },
                headerBackTitle: t('Back'),
                headerTintColor: '#fff',
            }} />
        </Stack.Navigator>
    );
}
