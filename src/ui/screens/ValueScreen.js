import {
    Text,
    View,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView,
    Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import Container from '../components/Container';

export default function ValueScreen({navigation}) {
    const {t} = useTranslation();
    const [gas, setGas] = useState({});
    const [pressure, setPressure] = useState(1);
    const [temperature, setTemperature] = useState(0);
    const [balloonValue, setBalloonValue] = useState(1000);
    const [result, setResult] = useState(0.0);
    const [koef, setKoef] = useState(0.0);
    const [advancedVisible, setAdvancedVisible] = useState(false);
    const gases = require('../../gases.json');
    const values = require('../../values.json');

    useEffect(() => {
        navigation.setOptions({
            title: ''
        })
        setGas(gases[0]);
    }, []);
    useEffect(() => {
        if (values) {
            for (const element of values) {
                if (element.gas_id === gas.id && element.pressure === pressure && element.temp === temperature) {
                    let k = ((0.968 * pressure + 1) * (293 / (273 + temperature)) * 0.001) / element.koef;
                    setKoef(k);
                    let R = k * balloonValue;
                    setResult(R);
                }
            }
        }
    }, [gas, pressure, temperature, balloonValue]);

    let image = require('../../assets/bg-car.jpg');

    return (
        <Container image={image}>
            <View style={{height: 'auto', maxHeight: Dimensions.get('window').height - 80}}>
                <ScrollView scrollEnabled={true} nestedScrollEnabled={true} style={styles.mainContainer}>
                    { /* Select gas */}
                    <View style={styles.inputContainer}>
                        <Text style={{...styles.text, color: '#666'}}>{t('SelectGas')}</Text>
                        <SelectDropdown
                            renderButton={(selectedItem, isOpened) => {
                                if (selectedItem) {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text style={{...styles.dropdownPlaceholderStyle, color: '#000'}}>
                                                    {selectedItem.title}
                                                </Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <View style={styles.dropdownPlaceholderStyle}>
                                                <Text style={styles.dropdownPlaceholderStyle}>
                                                    {t('SelectGas')}
                                                </Text>
                                                <FontAwesomeIcon icon={faChevronDown}
                                                                 style={styles.dropdownItemIconStyle}/>
                                            </View>
                                        </View>
                                    );
                                }
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#DDD'})}}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            onSelect={(selectedItem) => {
                                setGas(selectedItem);
                            }}
                            defaultValue={gas}
                            data={gases}/>
                    </View>
                    { /* Pressure */}
                    <View style={styles.inputContainer}>
                        <Text style={{...styles.text, color: '#666'}}>{t('Density')}</Text>
                        <View style={styles.inline}>
                            <TextInput style={styles.inputText} onChangeText={(text) => {
                                if (text.length) {
                                    let val = Number.parseInt(text);
                                    console.log(val);
                                    if (val > 0 && val < 301) {
                                        setPressure(Number.parseInt(text));
                                    } else if (val > 300) {
                                        setPressure(300);
                                    }
                                }
                            }} inputMode={'numeric'}>{pressure}</TextInput>
                            <Text style={{...styles.text, marginLeft: 10}}>{t('Athmose')}</Text>
                        </View>
                    </View>
                    { /* Temperature */}
                    <View style={styles.inputContainer}>
                        <Text style={{...styles.text, color: '#666'}}>{t('Temperature')}</Text>
                        <View style={styles.inline}>
                            <TextInput style={styles.inputText} onChangeText={text => {
                                if (text.length) {
                                    let val = Number.parseInt(text);
                                    if (val > -31 && val < 31) {
                                        setTemperature(val);
                                    }
                                }
                            }} inputMode={'numeric'}>{temperature}</TextInput>
                            <Text style={{...styles.text, marginLeft: 10}}>{t('Celcium')}</Text>
                        </View>
                    </View>
                    { /* Value */}
                    <View style={styles.inputContainer}>
                        <Text style={{...styles.text, color: '#666'}}>{t('Balloon Value')}</Text>
                        <View style={styles.inline}>
                            <TextInput style={styles.inputText} onChangeText={text => {
                                if (text.length) {
                                    let val = Number.parseInt(text);
                                    setBalloonValue(val);
                                }
                            }} inputMode={'numeric'}>{balloonValue}</TextInput>
                            <Text style={{...styles.text, marginLeft: 10}}>{t('Liters')}</Text>
                        </View>
                    </View>
                    { /* Result */}
                    <View style={styles.resultContainer}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{...styles.text, fontWeight: 'bold'}}>{t('Gas Value')}: </Text>
                            <Text
                                style={styles.text}>{Math.floor(result * 1000000) / 1000000}... {t('CubicMeter-small')}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{...styles.text, fontWeight: 'bold'}}>{t('Koefficient K')}: </Text><Text
                            style={styles.text}>{Math.floor(koef * 100000000) / 100000000}...</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => {
                        setAdvancedVisible(!advancedVisible);
                    }} style={{paddingTop: 20}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{...styles.text, fontWeight: 'bold'}}>{t('Details')}</Text>
                            <FontAwesomeIcon icon={!advancedVisible ? faChevronDown : faChevronUp}/>
                        </View>
                    </Pressable>
                    {advancedVisible && <View>
                        <Text style={{...styles.text, paddingBottom: 10}}>С помощью данного калькулятора Вы можете
                            расчитать сколько кислорода, азота, аргона или гелия содержится в баллоне при различных
                            температурах и давлениях. Для этого необходимо выбрать интересующий Вас газ, проставить
                            давление (диапазон давлениий для всех газов за исключением гелия от 1 до 300атм, для
                            гелия до 400атм) и температуру (диапазон температур для каждого газа от -30 до +30°C), а
                            также объем баллона.</Text>
                        <Text style={{...styles.text, paddingBottom: 10}}>Результатом будет объем газа, содержащийся
                            в указанном баллоне при выбранном давлении и температуре. Также выводится коэффициент К,
                            который используется для определения объема газа в баллоне при нормальных
                            условиях.</Text>
                        <Text style={{...styles.text, fontStyle: 'italic'}}>K = (0.968 * P + 1) * (293 / 273 + t) *
                            0,001 /
                            z</Text>
                        <Text style={{...styles.text, fontSize: 12}}>z - коэффициент сжимаемости газа'</Text>
                        <Text></Text>
                        <Text></Text>
                    </View>}
                </ScrollView>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 5,
    },
    dropdownSearchInputStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
    dropdownPlaceholderStyle: {
        flex: 1,
        color: '#999',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 5,
    },
    dropdownItemTxtStyle: {
        padding: 10,
        fontSize: 14,
        flex: 1,
        color: '#151E26',
    },
    dropdownPlaceholderTextStyle: {
        marginLeft: 5,
        color: '#000',
    },
    dropdownButtonIconStyle: {
        marginRight: 8,
    },
    mainContainer: {
        padding: 15,
    },
    text: {
        color: '#000',
        fontFamily: 'Roboto-Regular',
    },
    advanced: {
        margin: 5,
        padding: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000',
    },
    toTopRight: {
        position: 'absolute',
        top: 10,
        right: 10,
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
        width: '80%',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        minHeight: 69,
        maxHeight: 70,
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resultContainer: {
        backgroundColor: 'rgba(231, 242, 250, .7)',
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 79,
        maxHeight: 80,
    },
});
