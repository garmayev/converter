import {View, StyleSheet, Text, TextInput, Keyboard, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {useTranslation} from 'react-i18next';
import {InputGroup} from '../components/InputGroup';
import SelectDropdown from 'react-native-select-dropdown';

export default function ReceiverScreen({navigation}) {
    const {t} = useTranslation();
    const afterDot = 6,
        P = 101325,
        R = 8.314462;
    const gases = [
        {
            title: t('Oxygen'),
            moll: 0.032,
            density: 1.141,
            availableScale: 'w',
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
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
            title: t('Argon'),
            moll: 0.039948,
            density: 1.392,
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
            ],
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 6.2},
                {title: t('balloonWeight', {value: 20}), value: 3.1},
                {title: t('balloonWeight', {value: 10}), value: 1.55},
                {title: t('balloonWeight', {value: 5}), value: 0.78},
            ],
            availableScale: 'w',
        },
        {
            title: t('Air'),
            moll: 0.02896,
            density: 0.873,
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 6.3},
                {title: t('balloonWeight', {value: 10}), value: 1.58},
                {title: t('balloonWeight', {value: 5}), value: 0.79},
            ],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
        {
            title: t('Hydrogen'),
            moll: 0.0020156,
            density: 0.0708,
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 6.3},
                {title: t('balloonWeight', {value: 10}), value: 1.58},
                {title: t('balloonWeight', {value: 5}), value: 0.79},
            ],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
        {
            title: t('Helium'),
            moll: 0.004003,
            density: 0.145,
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 5.25},
                {title: t('balloonWeight', {value: 20}), value: 2.85},
                {title: t('balloonWeight', {value: 10}), value: 1.43},
                {title: t('balloonWeight', {value: 5}), value: 0.72},
            ],
            availableScale: 'w',
        },
        {
            title: t('Nitrogen'),
            moll: 0.028016,
            density: 0.808,
            availableScale: 'l',
            scales: [
                {title: t('L-small'), value: 'l'},
            ],
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            balloons: [
                {title: t('balloonWeight', {value: 50}), value: 7.12},
                {title: t('balloonWeight', {value: 40}), value: 5.7},
                {title: t('balloonWeight', {value: 5}), value: 0.72},
            ],
        },
        {
            title: t('CarbonDioxide'),
            moll: 0.04401,
            density: 0.771,
            availableScale: 'w',
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
            ],
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            balloons: [
                {title: t('balloonWeight', {value: 50}), value: 12},
                {title: t('balloonWeight', {value: 40}), value: 7.8},
                {title: t('balloonWeight', {value: 20}), value: 3.16},
                {title: t('balloonWeight', {value: 10}), value: 2},
                {title: t('balloonWeight', {value: 5}), value: 0.8},
            ],
        },
        {
            title: t('Methane'),
            moll: 0.01604,
            density: 0.415,
            balloons: [
                {title: t('balloonWeight', {value: 40}), value: 6},
                {title: t('balloonWeight', {value: 10}), value: 1.5},
            ],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
        {
            title: t('Xenon'),
            moll: 0.132108,
            density: 3.520,
            balloons: [],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
        {
            title: t('Krypton'),
            moll: 0.0838283,
            density: 2.1550,
            balloons: [],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
        {
            title: t('Neon'),
            moll: 0.02698644,
            density: 0.9,
            balloons: [],
            scales: [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}],
            availableScale: 'w',
        },
    ];
    const scales = [{title: t('Kg-small'), value: 'kg'}, {title: t('T-small'), value: 't'}];
    const balloonList = [
        {title: t('balloonWeight', {value: 40}), value: 40},
        {title: t('balloonWeight', {value: 25}), value: 25},
        {title: t('balloonWeight', {value: 10}), value: 10},
    ];
    const temperatureList = [
        {title: '-50 \u2103', value: -50, density: 94},
        {title: '-40 \u2103', value: -40, density: 103},
        {title: '-30 \u2103', value: -30, density: 111},
        {title: '-20 \u2103', value: -20, density: 120},
        {title: '-10 \u2103', value: -10, density: 127},
        {title: '0 \u2103', value: 0, density: 135},
        {title: '10 \u2103', value: 10, density: 143},
        {title: '20 \u2103', value: 20, density: 150},
        {title: '30 \u2103', value: 30, density: 157},
        {title: '35 \u2103', value: 35, density: 160},
    ];

    const [result, setResult] = useState({value: 0, K: 0, weight: -1000.0, gas: -1000.0, liquid: -1000.0});
    const [value, _setValue] = useState(1);
    const [gas, _setGas] = useState(gases[0]);
    const [scale, _setScale] = useState(scales[0]);
    const [balloon, setBalloon] = useState(balloonList[0]);
    const [temperature, setTemperature] = useState(temperatureList[7]);
    const setValue = (data) => {
        _setValue(Number.parseInt(data));
    };
    const setGas = (value) => {
        _setGas(value);
        if (value.scales) {
            _setScale(value.scales[0]);
        }
        if (value.balloons.length) {
                setBalloon(value.balloons[0]);
        } else {
            setBalloon(undefined)
        }
    };

    useEffect(() => {
        setGas(gases[0]);
        if (gas.defaultBalloon) {
            setBalloon(gas.defaultBalloon)
        } else {
            setBalloon(gas.balloons[0]);
        }
        // navigation.setOptions({
        //     title: " "
        // })
    }, []);

    function calculate() {
        let cubic = 0, w = -1000.0, l = -1000.0, g = -1000.0;

        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        switch (scale.value) {
            case 'kg':
                if (balloon) {
                    cubic = (value / getDensity(gas, temperature.value)).toFixed(afterDot);
                }
                console.log(gas.availableScale)
                if (gas.availableScale === 'w') {
                    l = value / gas.density;
                    g = value / getDensity(gas, temperature.value);
                }
                break;
            case 't':
                if (balloon) {
                    cubic = ((value * 1000) / getDensity(gas, temperature.value)).toFixed(afterDot);
                }
                if (gas.availableScale === 'w') {
                    l = (value * 1000) / gas.density;
                    g = (value * 1000) / getDensity(gas, temperature.value);
                }
                break;
            case 'l':
                if (balloon) {
                    cubic = ((value * gas.density) / getDensity(gas, temperature.value)).toFixed(afterDot);
                }
                if (gas.availableScale === 'l') {
                    w = value * gas.density;
                    g = value * getDensity(gas, temperature.value);
                }
                break;
        }

        if (balloon) {
            setResult({value: (cubic / balloon.value), weight: w, liquid: l, gas: g});
        } else {
            setResult({weight: w, liquid: l, gas: g});
        }
    }

    return (
        <Container>
            {/* Gas */}
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                {/*<Text style={styles.inputLabel}>{t('SelectGas')}</Text>*/}
                <SelectDropdown
                    defaultValue={gas}
                    onSelect={(selectedItem) => {
                        setGas(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    (selectedItem && (selectedItem.title !== t('SelectGas'))) ?
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
            {/* Value-Scale */}
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
                    }} placeholderTextColor={'#777'} placeholder={t('Value')}>1</TextInput>
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
                                    (selectedItem && (selectedItem.title !== t('SelectScale'))) ?
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
            {/* Temperature */}
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                {/*<Text style={styles.inputLabel}>{t('Balloon value')}</Text>*/}
                <SelectDropdown
                    defaultValue={temperature}
                    onSelect={(selectedItem) => {
                        setTemperature(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    (selectedItem && (selectedItem.title !== t('Temperature'))) ?
                                        (<Text style={styles.dropdownButtonTxtStyle}>{selectedItem.title}</Text>) :
                                        (<Text style={styles.dropdownPlaceholderStyle}>{t('Temperature')}</Text>)
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
                    data={temperatureList}/>
            </View>
            {/* Balloon */}
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                {/*<Text style={styles.inputLabel}>{t('Balloon value')}</Text>*/}
                <SelectDropdown
                    defaultValue={balloon}
                    // disabled={gas.balloons.length > 0}
                    onSelect={(selectedItem) => {
                        setBalloon(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    (selectedItem && (selectedItem.title !== t('Balloon Value'))) ?
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
            {/* Submit */}
            <View style={{paddingHorizontal: 10, paddingTop: 10, elevation: 10}}>
                <Button title={t('Calculate')} onPress={() => {
                    Keyboard.dismiss();
                    calculate();
                }}/>
            </View>
            <View style={styles.result}>
                {result.weight > -1 &&
                    <View style={styles.horizontal}>
                        <Text style={styles.resultText}>{t('Weight')}:</Text>
                        <Text style={styles.resultValue}>{result.weight.toFixed(afterDot)} {t('Kg-small')}</Text>
                    </View>}
                {result.liquid > -1 &&
                    <View style={styles.horizontal}>
                        <Text style={styles.resultText}>{t('Liquid')}:</Text>
                        <Text style={styles.resultValue}>{result.liquid.toFixed(afterDot)} {t('L-small')}</Text>
                    </View>}
                {result.gas > -1 &&
                    <View style={styles.horizontal}>
                        <Text style={styles.resultText}>{t('Gas')}:</Text>
                        <Text style={styles.resultValue}>{result.gas.toFixed(afterDot)} {t('CubicMeter-small')}</Text>
                    </View>}
                {result.value !== undefined ?
                    <>
                        <View style={{paddingTop: 15, ...styles.horizontal}}>
                            <Text style={styles.resultText}>{t('Balloon count')}:</Text>
                            <Text style={styles.resultValue}>{result.value.toFixed(2)} {t('Object')}</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal: 20,
                            fontSize: 16,
                            textAlign: 'right',
                            color: '#666',
                        }}>{t('with density', {dens: temperature.density})} *</Text>
                    </>
                    : <Text style={{color: 'red', textAlign: "center"}}>{t('System Fail! Not enough data!')}</Text>}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    result: {
        margin: 20,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        paddingHorizontal: 10,
        fontSize: 24,
    },
    resultText: {
        color: '#000',
        fontSize: 18,
        margin: 0,
        padding: 0,
    },
    resultValue: {
        color: '#000',
        fontSize: 18,
    },
    resultHeader: {
        color: '#000',
        fontSize: 18,
        margin: 0,
        padding: 0,
        textAlign: 'center',
        paddingBottom: 4,
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
    }
    ,
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    }
    ,
    dropdownItemTxtStyle: {
        flex: 1,
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        marginRight: 8,
    },
});
