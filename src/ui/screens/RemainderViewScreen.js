import {FlatList, Modal, Pressable, ScrollView, Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import MyModal from '../components/MyModal';

function Item({data, onPress}) {
    const s = StyleSheet.create({
        positive: {
            color: '#090'
        },
        negative: {
            color: '#900'
        },
        container: {
            marginVertical: 8,
            marginHorizontal: 8,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            elevation: 5,
            backgroundColor: '#fff'
        }
    })
    return (
        <Pressable onPress={onPress}>
            <View style={s.container}>
                <Text style={data.item.result > 0 ? s.positive : s.negative}>{data.item.result}</Text>
                <Text style={{color: '#000'}}>{new Date(data.item.date).toLocaleDateString()} {new Date(data.item.date).toLocaleTimeString()}</Text>
            </View>
        </Pressable>
    );
}

export default function RemainderViewScreen({route, navigation}) {
    const {t} = useTranslation();
    const {selectedGas} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        navigation.setOptions({
            headerTitle: selectedGas.name,
        });
    }, [selectedGas]);

    return (
        <View style={{paddingBottom: 10}}>
            <MyModal animationType={'fade'} visible={modalVisible} requestClose={() => {
                setModalVisible(false);
            }} title={t('Remainder View Action')}>
                <View style={{alignItems: 'center'}}>
                    <Text
                        style={{color: '#000'}}>{t('Pressure')}: {selected && t('density', {density: selected.pressure})}</Text>
                    <Text
                        style={{color: '#000'}}>{t('Temperature')}: {selected && selected.temperature} {t('Celcium')}</Text>
                    <Text
                        style={{color: '#000'}}>{t('Balloon Value')}: {selected && t('balloonWeight', {value: selected.value})}</Text>
                    <Text style={{color: '#000'}}>{t('Count')}: {selected && selected.count} {t('Object')}</Text>
                    <Text
                        style={{color: '#000'}}>{t('Date')}: {selected && <>{new Date(selected.date).toLocaleDateString()} {new Date(selected.date).toLocaleTimeString()}</>}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#000'}}>{t('Result')}: </Text>
                        <Text
                            style={{color: selected.result > 0 ? '#090' : '#900'}}>{selected.result > 0 ? '+' : ''}{Math.floor(selected.result * 10000) / 10000}</Text>
                        <Text style={{color: '#000'}}> {t('CubicMeter-small')}</Text>
                    </View>
                </View>
            </MyModal>
            <FlatList data={selectedGas.history} renderItem={(item) => <Item data={item} onPress={() => {
                setModalVisible(true);
                setSelected(item.item);
            }} />} />
        </View>
    );
}
