import {View, StyleSheet, Text, TextInput, Keyboard, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {useTranslation} from 'react-i18next';
import {InputGroup} from '../components/InputGroup';
import SelectDropdown from 'react-native-select-dropdown';

export default function ReceiverScreen() {
    const {t} = useTranslation();
    const afterDot = 6,
        P = 101325,
        R = 8.314462;
    const gases = [
        {
            title: t('Oxygen'),
            moll: 0.032,
            density: 1.141,
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
            ],
            balloons: [
                {title: t('balloonWeight', {value: 50}), value: 7.8},
                {title: t('balloonWeight', {value: 40}), value: 6},
                {title: t('balloonWeight', {value: 20}), value: 3.16},
                {title: t('balloonWeight', {value: 10}), value: 2},
                {title: t('balloonWeight', {value: 5}), value: 0.8},
            ],
        },
        {
            title: t('CarbonDioxide'),
            moll: 0.04401,
            density: 0.771,
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
            ],
            balloons: [
                {title: t('balloonWeight', {value: 50}), value: 7.8},
                {title: t('balloonWeight', {value: 40}), value: 12},
                {title: t('balloonWeight', {value: 20}), value: 3.16},
                {title: t('balloonWeight', {value: 10}), value: 2},
                {title: t('balloonWeight', {value: 5}), value: 0.8},
            ],
        },
        {
            title: t('Nitrogen'),
            moll: 0.028016,
            density: 0.808,
            scales: [
                {title: t('L-small'), value: 'l'},
            ],
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 6.4},
                {title: t('balloonWeight', {value: 20}), value: 2.86},
                {title: t('balloonWeight', {value: 10}), value: 1.2},
                {title: t('balloonWeight', {value: 5}), value: 0.71},
            ],
        },
    ];
    const scales = [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}];
    const balloonList = [
        {title: t('balloonWeight', {value: 40}), value: 40},
        {title: t('balloonWeight', {value: 25}), value: 25},
        {title: t('balloonWeight', {value: 10}), value: 40},
    ];

    const [result, setResult] = useState({value: 0, K: 0});
    const [value, _setValue] = useState(1);
    const [gas, _setGas] = useState(gases[0]);
    const [scale, _setScale] = useState(scales[0]);
    const [balloon, setBalloon] = useState(balloonList[0]);
    const setValue = (data) => {
        _setValue(Number.parseInt(data));
    };
    const setGas = (value) => {
        _setGas(value);
        _setScale(value.scales[0]);
        setBalloon(value.balloons[0]);
    };

    useEffect(() => {
        setGas(gases[0]);
        _setScale(gas.scales[0]);
        setBalloon(gas.balloons[0]);
    }, []);


    function calculate() {
        let cubic = 0;

        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        switch (scale.value) {
            case 'kg':
                cubic = (value / getDensity(gas, 20)).toFixed(afterDot);
                break;
            case 't':
                cubic = ((value * 1000) / getDensity(gas, 20)).toFixed(afterDot);
                break;
            case 'l':
                cubic = ((value * gas.density) / getDensity(gas, 20)).toFixed(afterDot);
                break;
        }
        setResult({value: cubic / balloon.value});
        console.log(balloon.value);
        console.log(result.value);
    }

    return (
        <Container>
            {/*Gas*/}
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                {/*<Text style={styles.inputLabel}>{t('SelectGas')}</Text>*/}
                <SelectDropdown
                    onSelect={(selectedItem) => {
                        setGas(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    (selectedItem && (selectedItem.title != t('SelectGas'))) ?
                                        (<Text style={styles.dropdownButtonTxtStyle}>{selectedItem.title}</Text>) :
                                        (<Text style={styles.dropdownPlaceholderStyle}>{t('SelectGas')}</Text>)
                                }
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    data={gases}/>
            </View>
            <View style={{
                paddingHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
                paddingBottom: 10,
            }}>
                {/*value*/}
                <View style={{width: '70%', padding: 0, margin: 0}}>
                    {/*<Text style={styles.inputLabel}>{t('Value')}</Text>*/}
                    <TextInput style={styles.inputText} onChangeText={(e, target, text) => {
                        setValue(e);
                    }} placeholderTextColor={"#777"} placeholder={t('Value')}></TextInput>
                </View>
                {/*scale*/}
                <SelectDropdown
                    defaultValue={scale}
                    onSelect={(selectedItem) => {
                        _setScale(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={{width: '27%', marginLeft: 10, ...styles.dropdownButtonStyle}}>
                                {
                                    (selectedItem && (selectedItem.title != t('SelectScale'))) ?
                                        (<Text style={styles.dropdownButtonTxtStyle}>{selectedItem.title}</Text>) :
                                        (<Text style={styles.dropdownPlaceholderStyle}>{t('SelectScale')}</Text>)
                                }
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    data={gas.scales}/>
            </View>
            {/*balloon*/}
            <View style={{paddingHorizontal: 10}}>
                {/*<Text style={styles.inputLabel}>{t('Balloon value')}</Text>*/}
                <SelectDropdown
                    // defaultValue={balloon}
                    onSelect={(selectedItem) => {
                        setBalloon(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    (selectedItem && (selectedItem.title != t('Balloon Value'))) ?
                                        (<Text style={styles.dropdownButtonTxtStyle}>{selectedItem.title}</Text>) :
                                        (<Text style={styles.dropdownPlaceholderStyle}>{t('Balloon Value')}</Text>)
                                }
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    data={gas.balloons}/>
            </View>
            <View style={{padding: 10, elevation: 10}}>
                <Button title={t('Calculate')} onPress={() => {
                    Keyboard.dismiss();
                    calculate();
                }}/>
            </View>
            <View style={styles.result}>
                <Text style={styles.resultHeader}>{t('Calculated indicators')}</Text>
                <View style={styles.horizontal}>
                    <Text style={styles.resultText}>{t('Balloon count')}:</Text>
                    <Text style={styles.resultValue}>{result.value.toFixed(2)} {t('Object')}</Text>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 0,
    },
    result: {
        margin: 20,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        height: 120,
        fontSize: 24,
        flex: 1,
    },
    resultText: {
        color: '#000',
        fontSize: 16,
        margin: 0,
        padding: 0,
    },
    resultValue: {
        color: '#000',
    },
    resultHeader: {
        color: '#000',
        fontSize: 21,
        margin: 0,
        padding: 0,
        textAlign: 'center',
    },
    inputLabel: {
        color: '#0C68A9',
        padding: 5,
        fontWeight: 'bold',
    },
    inputText: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: '#000',
        height: 35,
        zIndex: 5,
        elevation: 5,
    },
    dropdownButtonStyle: {
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        color: '#000',
    },
    dropdownPlaceholderStyle: {
        flex: 1,
        color: '#777',
    },
    dropdownButtonArrowStyle: {},
    dropdownButtonIconStyle: {
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        marginRight: 8,
    },
});
