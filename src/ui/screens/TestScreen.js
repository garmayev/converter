import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet, TextInput, Keyboard} from 'react-native';
import Scale from '../../classes/Scale';
import Gas from '../../classes/Gas';
import Balloon from '../../classes/Balloon';
import React, {useState, useEffect} from 'react';
import Container from '../components/Container';
import Temperature from '../../classes/Temperature';
import SelectDropdown from 'react-native-select-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TouchableRipple} from 'react-native-paper';
import ResultContainer from '../components/ResultContainer';

export default function TestScreen({navigation}) {
    const {t} = useTranslation();
    const LogoSize = 60;
    const gases = [
        new Gas({
            title: t('Oxygen'),
            moll: 0.03201589,
            mollValue: 22.393,
            density: 1.141,
            defaultBalloon: 1,
            balloonDensity: 200,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 50}), value: 7.8, density: 200}),
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6, density: 200}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 3.16, density: 200}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 2, density: 200}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.8, density: 200}),
            ],
        }),
        new Gas({
            title: t('Argon'),
            moll: 0.039948,
            mollValue: 22.394,
            density: 1.392,
            defaultBalloon: 0,
            balloonDensity: 200,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6.2}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 3.1}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.55}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.78}),
            ],
        }),
        new Gas({
            title: t('Air'),
            moll: 0.02896,
            density: 0.873,
            defaultBalloon: 0,
            balloonDensity: 200,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6.3}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.58}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.79}),
            ],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
        new Gas({
            title: t('Hydrogen'),
            moll: 0.0020156,
            mollValue: 22.430,
            density: 0.0708,
            defaultBalloon: 0,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6.3}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.58}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.79}),
            ],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
        new Gas({
            title: t('Helium'),
            moll: 0.004003,
            mollValue: 22.426,
            density: 0.145,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            defaultBalloon: 0,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 5.25}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 2.85}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.43}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.72}),
            ],
        }),
        new Gas({
            title: t('Nitrogen'),
            moll: 0.028016,
            mollValue: 22.260,
            density: 0.808,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            defaultBalloon: 1,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 50}), value: 7.12}),
                new Balloon({title: t('balloonWeight', {value: 40}), value: 5.7}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.72}),
            ],
        }),
        new Gas({
            title: t('CarbonDioxide'),
            moll: 0.04401,
            mollValue: 22.262,
            density: 0.771,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            defaultBalloon: 1,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 50}), value: 12}),
                new Balloon({title: t('balloonWeight', {value: 40}), value: 7.8}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 3.16}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 2}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.8}),
            ],
        }),
        new Gas({
            title: t('Methane'),
            moll: 0.01604,
            mollValue: 22.376,
            density: 0.415,
            defaultBalloon: 0,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.5}),
            ],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
        new Gas({
            title: t('Xenon'),
            moll: 0.132108,
            mollValue: 22.266,
            density: 3.520,
            defaultBalloon: null,
            balloons: [],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
        new Gas({
            title: t('Krypton'),
            moll: 0.0838283,
            mollValue: 22.388,
            density: 2.1550,
            defaultBalloon: null,
            balloons: [],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
        new Gas({
            title: t('Neon'),
            moll: 0.02698644,
            mollValue: 22.428,
            density: 0.9,
            defaultBalloon: null,
            balloons: [],
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
        }),
    ];
    const temperatureList = [
        new Temperature({title: '-50 \u2103', value: -50, density: 94}),
        new Temperature({title: '-40 \u2103', value: -40, density: 103}),
        new Temperature({title: '-30 \u2103', value: -30, density: 111}),
        new Temperature({title: '-20 \u2103', value: -20, density: 120}),
        new Temperature({title: '-10 \u2103', value: -10, density: 127}),
        new Temperature({title: '0 \u2103', value: 0, density: 135}),
        new Temperature({title: '10 \u2103', value: 10, density: 143}),
        new Temperature({title: '20 \u2103', value: 20, density: 150}),
        new Temperature({title: '30 \u2103', value: 30, density: 157}),
        new Temperature({title: '35 \u2103', value: 35, density: 160}),
    ];

    const [gas, _setGas] = useState(gases[0]);
    const [value, setValue] = useState(1);
    const [scale, _setScale] = useState(gases[0].scales[1]);
    const [temperature, setTemperature] = useState(temperatureList[7]);
    const [balloon, _setBalloon] = useState(gases[0].balloons[gases[0].defaultBalloon]);
    const [result, setResult] = useState({weight: 0.0, liquid: 0.0, gas: 0.0, count: 0.0});
    const [error, setError] = useState(false);
    const setGas = value => {
        _setGas(value);
        _setScale(value.scales[0]);
    };
    const setScale = value => {
        _setScale(value);
    };
    const setBalloon = value => {
        _setBalloon(value);
    };
    useEffect(() => {
        // calculate();
        setGas(gases[0]);
    }, []);

    function calculate() {
        gas.temperature(temperature.value, true);
        switch (scale.value) {
            case 'kg':
                gas.fromWeight(value);
                break;
            case 't':
                gas.fromWeight(value * 1000);
                break;
            case 'l':
                gas.fromLiquid(value);
                break;
            case 'm3':
                gas.fromGas(value);
        }
        if (balloon) {
            setResult({weight: gas.weight, liquid: gas.liquid, gas: gas.gas, count: gas.gas / balloon.value});
        } else {
            setError(true);
            setResult({weight: gas.weight, liquid: gas.liquid, gas: gas.gas, count: 0.0});
        }
    }

    return (
        <Container>
            {/* Gas */}
            <View style={styles.inlineContainer}>
                <SelectDropdown
                    defaultValue={gas}
                    showVerticalScrollIndicator={true}
                    onSelect={(selectedItem) => {
                        setGas(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {
                                    selectedItem ?
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text style={styles.dropdownPlaceholderTextStyle}>
                                                    {selectedItem.title}
                                                </Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        ) : (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text style={styles.dropdownPlaceholderStyle}>
                                                    {t('SelectGas')}
                                                </Text>
                                                <FontAwesomeIcon icon={faChevronDown} style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        )
                                }
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#DDD'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    search={true}
                    searchInputStyle={styles.dropdownSearchInputStyle}
                    searchInputTxtColor={'#151E26'}
                    searchPlaceHolder={t('InputGasName')}
                    searchPlaceHolderColor={'#72808D'}
                    data={gases}/>
                {/*<Text style={styles.inputLabel}>{t('SelectGas')}</Text>*/}
            </View>
            {/* Value-Scale */}
            <View style={styles.comboContainer}>
                {/* Value */}
                <View style={{width: '50%', padding: 0, margin: 0}}>
                    <TextInput style={styles.inputText} onChangeText={(e) => {
                        setValue(Number.parseFloat(e));
                    }} inputMode={'numeric'} placeholderTextColor={'#000'} placeholder={t('Value')}>1</TextInput>
                </View>
                {/* Scale */}
                <View style={{width: '47%', marginLeft: 10}}>
                    <SelectDropdown
                        defaultValue={gases[0].scales[0]}
                        onSelect={(selectedItem) => {
                            setScale(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={{...styles.dropdownButtonStyle}}>
                                    {
                                        (selectedItem && (selectedItem.title !== t('SelectScale'))) ?
                                            (
                                                <View style={styles.dropdownPlaceholderStyle}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{selectedItem.title}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            ) :
                                            (
                                                <View style={styles.dropdownPlaceholderStyle}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{t('SelectScale')}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            )
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
                        data={gases[0].scales}/>
                    {/*<Text style={[styles.inputLabel, {top: -10, left: 10}]}>{t('SelectScale')}</Text>*/}
                </View>
            </View>
            {/* Temperature */}
            <View style={styles.inlineContainer}>
                {/*<Text style={{zIndex: 5, ...styles.inputLabel}}>{t('Temperature')}</Text>*/}
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
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{...styles.dropdownPlaceholderStyle}}>{selectedItem.title}</Text>
                                                <Text style={{...styles.dropdownPlaceholderTextStyle, fontSize: 12, color: '#999'}}>{t('with density', {dens: selectedItem.density})}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        ) : (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{t('Temperature')}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        )
                                }
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                <Text style={{...styles.dropdownPlaceholderTextStyle, fontSize: 12, color: '#999'}}>{t('with density', {dens: item.density})}</Text>
                            </View>
                        );
                    }}
                    data={temperatureList}/>
            </View>
            {/* Balloon */}
            <View style={styles.comboContainer}>
                <View style={{width: '50%'}}>
                    <SelectDropdown
                        defaultValue={gases[0].balloons[gas.defaultBalloon]}
                        // disabled={gas.balloons.length > 0}
                        onSelect={(selectedItem, index) => {
                            setBalloon(gas.balloons[index]);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    {
                                        (selectedItem && (selectedItem.title !== t('Balloon Value'))) ?
                                            (
                                                <View style={styles.dropdownPlaceholderStyle}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{selectedItem.title}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            ) : (
                                                <View style={styles.dropdownPlaceholderStyle}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{t('Balloon Value')}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            )
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
                    {/*<Text style={{...styles.inputLabel, top: -13, left: 5}}>{t('Balloon Value')}</Text>*/}
                </View>
                <View style={{width: '47%'}}>
                    <SelectDropdown
                        defaultValue={{title: '150 кгс/см\u00B2', value: 150}}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    {
                                        (selectedItem && (selectedItem.title !== t('Balloon Value'))) ?
                                            (
                                                <View style={styles.dropdownPlaceholderStyle}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{selectedItem.title}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            ) : (
                                                <View style={{
                                                    ...styles.dropdownPlaceholderStyle,
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    alignContent: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Text
                                                        style={styles.dropdownPlaceholderStyle}>{t('Density')}</Text>
                                                    <FontAwesomeIcon icon={faChevronDown}
                                                                     style={styles.dropdownItemIconStyle}/>
                                                </View>
                                            )
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
                        data={[{title: '150 кгс/см\u00B2', value: 150}]}/>
                    {/*<Text style={{...styles.inputLabel, top: -13, left: 5, color: '#000071'}}>{t('BalloonDensity')}</Text>*/}
                </View>
            </View>
            {/* Submit */}
            <View style={styles.submitContainer}>
                <View style={styles.submit}>
                    <TouchableRipple onPress={() => {
                        Keyboard.dismiss();
                        calculate();
                    }} style={{
                        elevation: 5,
                        backgroundColor: '#5599EE',
                        paddingVertical: 5,
                        width: '50%',
                        left: '25%',
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 18,
                            letterSpacing: .9,
                        }}>{t('Calculate')}</Text>
                    </TouchableRipple>
                </View>
            </View>
            {/* Result */}
            <View style={styles.resultContainer}>
                <ResultContainer
                    logoSize={LogoSize}
                    selectedGas={gas}
                    scale={scale}
                    error={error}
                    result={result}/>
            </View>
        </Container>
    );
}

const rotate = '0.025rad';
const styles = StyleSheet.create({
    inlineContainer: {
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
    },
    comboContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 5,
    },
    inputLabel: {
        position: 'absolute',
        top: -8,
        left: 10,
        color: '#777',
        paddingHorizontal: 5,
        // backgroundColor: '#ffffff99'
    },
    inputText: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
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
        paddingHorizontal: 5,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        color: '#000',
    },
    dropdownPlaceholderStyle: {
        flex: 1,
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 5,
    },
    dropdownPlaceholderTextStyle: {
        marginLeft: 5,
        color: '#000',
    },
    dropdownButtonIconStyle: {
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    dropdownSearchInputStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
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
        marginRight: 5,
    },
    resultContainer: {
        transform: [{rotate: `-${rotate}`}],
        backgroundColor: '#5599EE',
        marginVertical: -10,
        marginHorizontal: -45,
        paddingBottom: 30,
        marginBottom: 25,
        width: '120%',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        zIndex: 99,
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
    submitContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        backgroundColor: '#3578CB',
        width: '120%',
        transform: [{rotate: rotate}],
        marginLeft: '-10%',
        marginTop: 15,
        zIndex: 3,
    },
    submit: {
        marginHorizontal: 50,
        paddingHorizontal: 3,
        paddingTop: 10,
        paddingBottom: 30,
        transform: [{rotate: `-${rotate}`}],
    },
});
