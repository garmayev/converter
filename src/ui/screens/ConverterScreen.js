import {useTranslation} from 'react-i18next';
import {StyleSheet, Keyboard, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {InputGroup} from '../components/InputGroup';
import SelectDropdown from 'react-native-select-dropdown';

export default function ConverterScreen() {
    const {t} = useTranslation();

    const
        P = 101325,
        R = 8.314462,
        gases = [
            {title: t('Oxygen'), moll: 0.032, density: 1.141},
            {title: t('Argon'), moll: 0.039948, density: 1.392},
            {title: t('Nitrogen'), moll: 0.028016, density: 0.808},
            {title: t('Air'), moll: 0.02896, density: 0.873},
            {title: t('Hydrogen'), moll: 0.0020156, density: 0.0708},
            {title: t('Helium'), moll: 0.004003, density: 0.145},
            {title: t('CarbonDioxide'), moll: 0.04401, density: 0.771},
            {title: t('Methane'), moll: 0.01604, density: 0.415},
            {title: t('Xenon'), moll: 0.132108, density: 3.520},
            {title: t('Krypton'), moll: 0.0838283, density: 2.1550},
            {title: t('Neon'), moll: 0.02698644, density: 0.9},
        ],
        afterDot = 6,
        scales = [
            {value: 1, title: t('Kg-small')},
            {value: 2, title: t('L-small')},
            {value: 3, title: `M\u00B3`},
        ];

    const [selectedGas, setSelectedGas] = useState(gases[0]);
    const [selectedScale, setSelectedScale] = useState(scales[0]);
    const [temperature, setTemperature] = useState(20);
    const [count, setCount] = useState(1);
    const [result, setResult] = useState({weight: '0.0', gas: '0.0', liquid: '0.0'});
    const calculate = () => {
        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        console.log(selectedScale.value);
        switch (selectedScale.value) {
            case 1:
                setResult({
                    weight: count.toFixed(afterDot),
                    gas: (count / getDensity(selectedGas, temperature)).toFixed(afterDot),
                    liquid: (count / selectedGas.density).toFixed(afterDot),
                });
                break;
            case 2:
                setResult({
                    weight: (count * selectedGas.density).toFixed(afterDot),
                    gas: ((count * selectedGas.density) / getDensity(selectedGas, temperature)).toFixed(afterDot),
                    liquid: (count).toFixed(afterDot),
                });
                break;
            case 3:
                setResult({
                    weight: (count * getDensity(selectedGas, temperature)).toFixed(afterDot),
                    gas: (count).toFixed(afterDot),
                    liquid: (count * getDensity(selectedGas, temperature) / selectedGas.density).toFixed(afterDot),
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // setSelectedGas(gases[0]);
        // setTemperature(20);
        // setSelectedScale(scales[0]);
        // setCount(1);
        // calculate();
    }, []);

    return (
        <Container>
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                {/*<Text style={styles.inputLabel}>{t('SelectGas')}</Text>*/}
                <SelectDropdown
                    onSelect={(selectedItem) => {
                        setSelectedGas(selectedItem);
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
            <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                <TextInput style={styles.inputText} placeholder={t("InputTemperature")} onChangeText={(text) => {
                    setTemperature(Number.parseInt(text))
                }} />
            </View>
            <View style={{
                paddingHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
            }}>
                {/*value*/}
                <View style={{width: '70%'}}>
                    <TextInput style={styles.inputText} onChangeText={(e) => {
                        setCount(Number.parseInt(e));
                    }} placeholder={t("InputValue")}
                    ></TextInput>
                </View>
                {/*scale*/}
                <SelectDropdown
                    onSelect={(selectedItem) => {
                        setSelectedScale(selectedItem);
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
                    data={scales}/>
            </View>
            <InputGroup labelText={t('Calculate')} inputType={'button'} onPress={() => {
                Keyboard.dismiss();
                calculate();
            }}/>
            <View style={{padding: 20, flex: 1, flexDirection: 'column'}}>
                <View style={styles.result}>
                    <Text style={styles.resultHeader}>{t('Calculated indicators')}</Text>
                    <View style={{margin: 0, ...styles.horizontal}}>
                        <Text style={styles.resultText}>{t('Weight')}:</Text>
                        <Text style={styles.resultValue}>{result.weight} {t('Kg-small')}</Text>
                    </View>
                    <View style={{margin: 0, ...styles.horizontal}}>
                        <Text style={styles.resultText}>{t('Gas')}:</Text>
                        <Text style={styles.resultValue}>{result.gas} M{'\u00B3'}</Text>
                    </View>
                    <View style={{margin: 0, ...styles.horizontal}}>
                        <Text style={styles.resultText}>{t('Liquid')}:</Text>
                        <Text style={styles.resultValue}>{result.liquid} {t('L-small')}</Text>
                    </View>
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
        padding: 0,
        margin: 0,
    },
    result: {
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        height: 120,
        fontSize: 24,
        flex: 1,
        paddingHorizontal: 20,
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
        color: '#151E26',
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
});
