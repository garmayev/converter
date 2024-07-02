import {View, StyleSheet, Text, TextInput, Keyboard, Button, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../components/Container';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import ResultContainer from '../components/ResultContainer';
import Oxygen from '../components/svg/Oxygen';
import Argon from '../components/svg/Argon';
import Hydrogen from '../components/svg/Hydrogen';
import AndrowNative from 'react-native-androw/src/Androw-native';

export default function ReceiverScreen({navigation}) {
    const {t} = useTranslation();
    const LogoSize = 60;
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
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
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
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            defaultBalloon: {title: t('balloonWeight', {value: 40}), value: 6},
            // icon: () => (<Argon width={LogoSize} height={LogoSize}/>),
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
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
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
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            availableScale: 'w',
        },
        {
            title: t('Helium'),
            moll: 0.004003,
            density: 0.145,
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
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
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
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
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
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
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            availableScale: 'w',
        },
        {
            title: t('Xenon'),
            moll: 0.132108,
            density: 3.520,
            balloons: [],
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            availableScale: 'w',
        },
        {
            title: t('Krypton'),
            moll: 0.0838283,
            density: 2.1550,
            balloons: [],
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            availableScale: 'w',
        },
        {
            title: t('Neon'),
            moll: 0.02698644,
            density: 0.9,
            balloons: [],
            scales: [
                {title: t('Kg-small'), value: 'kg'},
                {title: t('T-small'), value: 't'},
                {title: t('L-small'), value: 'l'},
                {title: t('CubicMeter-small'), value: 'm3'},
            ],
            availableScale: 'w',
        },
    ];
    const scales = [
        {title: t('Kg-small'), value: 'kg'},
        {title: t('T-small'), value: 't'},
        {title: t('L-small'), value: 'l'},
        {title: t('CubicMeter-small'), value: 'm3'},
    ];
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

    const [gasResult, setGasResult] = useState(0.0);
    const [weightResult, setWeightResult] = useState(0.0);
    const [liquidResult, setLiquidResult] = useState(0.0);
    const [valueResult, setValueResult] = useState(0.0);
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
            setBalloon(undefined);
        }
    };

    useEffect(() => {
        setGas(gases[0]);
        if (gas.defaultBalloon) {
            setBalloon(gas.defaultBalloon);
        } else {
            setBalloon(gas.balloons[0]);
        }
    }, []);

    function calculate() {
        let cubic = 0, w = 0.0, l = 0.0, g = 0.0;

        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        switch (scale.value) {
            case 'kg':
                l = value / gas.density;
                g = value / getDensity(gas, temperature.value);
                w = value;
                if (balloon) {
                    cubic = (w / getDensity(gas, temperature.value));
                }
                break;
            case 't':
                l = (value * 1000) / gas.density;
                g = (value * 1000) / getDensity(gas, temperature.value);
                w = value * 1000;
                if (balloon) {
                    cubic = (w / getDensity(gas, temperature.value));
                }
                break;
            case 'l':
                w = value * gas.density;
                g = (value * gas.density) / getDensity(gas, temperature.value);
                l = value;
                if (balloon) {
                    cubic = ((w * gas.density) / getDensity(gas, temperature.value));
                }
                break;
            case 'm3':
                w = value * gas.density;
                g = value;
                l = (w * getDensity(gas, temperature.value)) / gas.density;
                if (balloon) {
                    cubic = ((w * gas.density) / getDensity(gas, temperature.value));
                }
                break;
        }

        if (balloon) {
            // setResult({value: (cubic / balloon.value), weight: w, liquid: l, gas: g});
            setGasResult(g);
            setLiquidResult(l);
            setWeightResult(w);
            setValueResult(cubic / balloon.value);
        } else {
            // setResult({weight: w, liquid: l, gas: g});
            setGasResult(g);
            setLiquidResult(l);
            setWeightResult(w);
            setValueResult(0.0);
        }
    }

    return (
        <Container>
            {/* Gas */}
            <View style={styles.inlineContainer}>
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
                                    selectedItem ?
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
            <View style={styles.comboContainer}>
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
            <View style={styles.inlineContainer}>
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
            <View style={styles.inlineContainer}>
                {/*<Text style={styles.inputLabel}>{t('Balloon value')}</Text>*/}
                <SelectDropdown
                    defaultValue={balloon}
                    disabled={gas.balloons.length > 0}
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
            <AndrowNative style={styles.shadow1}>
                <View style={styles.submitContainer}>
                    {/* Submit */}
                    <View style={styles.submit}>
                        <Button title={t('Calculate')} onPress={() => {
                            Keyboard.dismiss();
                            calculate();
                        }} style={{borderRadius: 16, elevation: 0, color: '#2196F3'}}/>
                    </View>
                    {/*Result*/}
                </View>
            </AndrowNative>
            {/* Result */}
            <AndrowNative style={styles.shadow2}>
                <View style={styles.resultContainer}>
                    <ResultContainer
                        logoSize={LogoSize}
                        gas={gas}
                        scale={scale}
                        afterDot={3}
                        valueResult={valueResult}
                        weightResult={weightResult}
                        liquidResult={liquidResult}
                        gasResult={gasResult}/>
                    {/*{gas.balloons.length === 0 &&*/}
                    {/*    <Text style={styles.resultComment}>{t('System Fail! Not enough data!')}</Text>*/}
                    {/*}*/}
                    <Text style={styles.resultComment}>{t('with density', {dens: temperature.density})} *</Text>
                </View>
            </AndrowNative>
        </Container>
    );
}
const rotate = '0.025rad';
const styles = StyleSheet.create({
    resultContainer: {
        transform: [{rotate: `-${rotate}`}],
        backgroundColor: '#5599EE',
        marginVertical: -10,
        marginHorizontal: -45,
        paddingBottom: 30,
        marginBottom: 25,
        // marginTop: 5,
        // height: 260,
        width: '120%',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    result: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        marginTop: -34,
        transform: [{rotate: rotate}],
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
    resultComment: {
        position: 'relative',
        color: '#E4E4E4',
        fontSize: 16,
        textAlign: 'right',
        width: '80%',
        bottom: -10,
        transform: [
            {rotate: rotate},
        ],
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
    inlineContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    comboContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    submitContainer: {
        backgroundColor: '#3578CB',
        width: '120%',
        transform: [{rotate: rotate}],
        marginLeft: '-10%',
        marginTop: 5,
        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 15,
    },
    submit: {
        marginHorizontal: 50,
        paddingHorizontal: 3,
        paddingTop: 10,
        paddingBottom: 30,
        elevation: 0,
        transform: [{rotate: `-${rotate}`}],
    },
    shadow1: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
    },
    shadow2: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .5,
        shadowRadius: 10,
    },
});
