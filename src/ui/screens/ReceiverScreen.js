import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Keyboard, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import ResultContainer from '../components/ResultContainer';
import Oxygen from '../icons/Oxygen';
import Argon from '../icons/Argon';
import {TouchableRipple} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Autocomplete from '../components/Autocomplete';
import Scale from '../../classes/Scale';
import Balloon from '../../classes/Balloon';
import Gas from '../../classes/Gas';

export default function ReceiverScreen({navigation}) {
    const {t} = useTranslation();
    const LogoSize = 60;
    const
        P = 101325,
        R = 8.314462;
    const gases = [
        new Gas({
            title:t('Oxygen'),
            moll: 0.032,
            density: 1.141,
            defaultBalloon: 1,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 50}), value: 7.8}),
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 3.16}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 2}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.8}),
            ],
        }),
        new Gas({
            title: t('Argon'),
            moll: 0.039948,
            density: 1.392,
            scales: [
                new Scale({title: t('Kg-small'), value: 'kg'}),
                new Scale({title: t('T-small'), value: 't'}),
                new Scale({title: t('L-small'), value: 'l'}),
                new Scale({title: t('CubicMeter-small'), value: 'm3'}),
            ],
            defaultBalloon: 0,
            balloons: [
                new Balloon({title: t('balloonWeight', {value: 40}), value: 6.2}),
                new Balloon({title: t('balloonWeight', {value: 20}), value: 3.1}),
                new Balloon({title: t('balloonWeight', {value: 10}), value: 1.55}),
                new Balloon({title: t('balloonWeight', {value: 5}), value: 0.78}),
            ],
        })
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
    const dataList = [
        {title: 'item 1', value: 0, uid: '0-000'},
        {title: 'item 2', value: 1, uid: '0-001'},
        {title: 'item 3', value: 2, uid: '0-002'},
        {title: 'item 4', value: 3, uid: '0-003'},
        {title: 'item 5', value: 4, uid: '0-004'},
    ];

    const [gasResult, setGasResult] = useState(0.0);
    const [weightResult, setWeightResult] = useState(0.0);
    const [liquidResult, setLiquidResult] = useState(0.0);
    const [valueResult, setValueResult] = useState(0.0);
    const [value, _setValue] = useState(1);
    const [gas, _setGas] = useState<Gas>(gases[0]);
    const [scale, _setScale] = useState<Scale>(gases[0].scales[0]);
    const [balloon, _setBalloon] = useState<Balloon>(gases[0].balloons[gases[0].defaultBalloon]);
    const [temperature, _setTemperature] = useState(temperatureList[7]);
    const setValue = (value) => {
        _setValue(Number.parseFloat(value));
        // calculate()
    };
    const setGas = (value) => {
        _setGas(value);
        if (value.scales) {
            _setScale(value.scales[0]);
        }
        if (value.balloons.length) {
            _setBalloon(value.balloons[value.defaultBalloon]);
        } else {
            _setBalloon(undefined);
        }
    };
    const setBalloon = (value) => {
        _setBalloon(value);
        // calculate()
    };
    const setTemperature = (value) => {
        _setTemperature(value);
        // calculate()
    };
    const setScale = (value) => {
        _setScale(value);
        // calculate()
    };

    useEffect(() => {
        _setGas(gases[0]);
        if (gas.defaultBalloon) {
            _setBalloon(gas.balloons[gas.defaultBalloon]);
        } else {
            _setBalloon(gas.balloons[0]);
        }
        calculate();
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
                gas.temperature(20, true)
                gas.fromWeight(value)
                console.log(gas.weight, gas.liquid, gas.gas)
                // w = value;
                // l = value / gas.density;
                // g = value / getDensity(gas, temperature.value);
                if (balloon) {
                    cubic = (w / getDensity(gas, temperature.value));
                }
                break;
            case 't':
                w = value * 1000;
                l = (value * 1000) / gas.density;
                g = (value * 1000) / getDensity(gas, temperature.value);
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
            setGasResult(g);
            setLiquidResult(l);
            setWeightResult(w);
            setValueResult(cubic / balloon.value);
            console.log(cubic, balloon);
        } else {
            setGasResult(g);
            setLiquidResult(l);
            setWeightResult(w);
            setValueResult(0.0);
        }
        console.log(g, l, w, valueResult);
    }

    return (
        <Container>
            <View style={styles.inlineContainer}>
                <Autocomplete data={dataList} placeholder={"Select item"} />
            </View>
            {/* Gas */}
            <View style={styles.inlineContainer}>
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
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{selectedItem.title}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
                                            </View>
                                        ) : (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{t('SelectGas')}</Text>
                                                <FontAwesomeIcon icon={faChevronDown} style={{paddingTop: 2}}/>
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
                    data={gases}/>
            </View>
            {/* Value-Scale */}
            <View style={styles.comboContainer}>
                {/*value*/}
                <View style={{width: '70%', padding: 0, margin: 0}}>
                    {/*<Text style={styles.inputLabel}>{t('Value')}</Text>*/}
                    <TextInput style={styles.inputText} onChangeText={(e, target, text) => {
                        setValue(e);
                    }} inputMode={'numeric'} placeholderTextColor={'#777'} placeholder={t('Value')}>1</TextInput>
                </View>
                {/*scale*/}
                <SelectDropdown
                    defaultValue={scale}
                    onSelect={(selectedItem) => {
                        setScale(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={{width: '27%', marginLeft: 10, ...styles.dropdownButtonStyle}}>
                                {
                                    (selectedItem && (selectedItem.title !== t('SelectScale'))) ?
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{selectedItem.title}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
                                            </View>
                                        ) :
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{t('SelectedScale')}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
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
                                        (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{selectedItem.title}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
                                            </View>
                                        ) : (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{t('Temperature')}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
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
                    data={temperatureList}/>
            </View>
            {/* Balloon */}
            <View style={styles.inlineContainer}>
                {/*<Text style={styles.inputLabel}>{t('Balloon value')}</Text>*/}
                <SelectDropdown
                    defaultValue={gas.balloons[gas.defaultBalloon]}
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
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{selectedItem.title}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
                                            </View>
                                        ) : (
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text
                                                    style={{marginLeft: 5, ...styles.dropdownPlaceholderStyle}}>{t('Balloon Value')}</Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={{marginTop: 2, marginRight: 3, color: '#AAA'}}/>
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
                    valueResult={valueResult}
                    weightResult={weightResult}
                    liquidResult={liquidResult}
                    gasResult={gasResult}/>
                <Text style={styles.resultComment}>{t('with density', {dens: temperature.density})} *</Text>
            </View>
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
        paddingHorizontal: 10,
        color: '#777',
        height: 35,
        zIndex: 5,
        elevation: 5,
    },
    dropdownButtonStyle: {
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 15,
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
        color: '#777',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10,
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
    },
    submit: {
        marginHorizontal: 50,
        paddingHorizontal: 3,
        paddingTop: 10,
        paddingBottom: 30,
        transform: [{rotate: `-${rotate}`}],
    },
});
