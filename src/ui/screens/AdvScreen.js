import {View} from 'react-native';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export default function AdvScreen({navigation}) {
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({title: t('Advertisements')})
    }, []);

    return (
        <View></View>
    )
}
