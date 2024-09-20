import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View, StyleSheet, Modal, AppState, ScrollView, TextInput, Alert} from 'react-native';
import {faChevronDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {pressures} from '../../const.js';
import MyModal from '../components/MyModal';

export default function RemainderScreen({navigation}) {
    const {t} = useTranslation();
    const [plusVisible, setPlusVisible] = useState(false);
    const [minusVisible, setMinusVisible] = useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [remainder, setRemainder] = useState();
    const [selectedGas, setSelectedGas] = useState({});

    const [plusGas, setPlusGas] = useState('');
    const [plusPressure, setPlusPressure] = useState(0);
    const [plusTemperature, setPlusTemperature] = useState(0);
    const [plusCount, setPlusCount] = useState(0);
    const [plusValue, setPlusValue] = useState(0);

    const [minusGas, setMinusGas] = useState('');
    const [minusPressure, setMinusPressure] = useState(0);
    const [minusCount, setMinusCount] = useState(0);
    const [minusValue, setMinusValue] = useState(0);
    const [minusTemperature, setMinusTemperature] = useState(0);
    useEffect(() => {
        getData().catch(error => console.error(error));
        navigation.setOptions({
            headerTitle: t('Remainder')
        })
    }, []);
    useEffect(() => {

    }, [minusGas]);


    const p = pressures();

    const getData = async () => {
        const r = await AsyncStorage.getItem('remainder');
        if (r !== null) {
            setRemainder(JSON.parse(r));
            return JSON.parse(r);
        } else {
            const data = [{
                name: t('Helium'),
                value: 0,
                history: [],
            }];
            setRemainder(data);
            return data;
        }
    };
    const setData = async (value) => {
        try {
            return await AsyncStorage.setItem('remainder', JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };
    const findGas = (item) => {
        for (const el of p) {
            if (el.name === item.name) {
                return el;
            }
        }
        return false
    }
    const findK = (pressure, temperature) => {
        for (const element of pressure.data) {
            if (Number.parseInt(element.temperature) === temperature) {
                return element.k;
            }
        }
    };

    return (
        <ScrollView style={styles.view}>
            <MyModal animationType={'fade'} visible={plusVisible} requestClose={() => {
                setPlusVisible(false);
            }} title={t('Add Gas')}>
                <SelectDropdown
                    renderButton={(selectedItem, isOpened) => {
                        if (selectedItem) {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <View style={styles.dropdownPlaceholderStyle}>
                                        <Text style={{...styles.dropdownPlaceholderStyle, color: '#000'}}>
                                            {selectedItem.name}
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
                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                            </View>
                        );
                    }}
                    onSelect={(item) => {
                        setSelectedGas(item);
                        setPlusGas(item);
                    }}
                    searchPlaceHolder={t('InputGasName')}
                    searchPlaceHolderColor={'#72808D'}
                    data={p}
                />
                <SelectDropdown
                    renderButton={(selectedItem, isOpened) => {
                        if (selectedItem) {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <View style={styles.dropdownPlaceholderStyle}>
                                        <Text style={{...styles.dropdownPlaceholderStyle, color: '#000'}}>
                                            {selectedItem.density}
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
                                            {t('Select Pressure')}
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
                                <Text style={styles.dropdownItemTxtStyle}>{item.density}</Text>
                            </View>
                        );
                    }}
                    onSelect={(selectedItem) => {
                        setPlusPressure(selectedItem);
                    }}
                    searchPlaceHolder={t('InputGasName')}
                    searchPlaceHolderColor={'#72808D'}
                    data={plusGas.pressures}
                />
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputTemperature')}
                           placeholderTextColor={'#999'} onChangeText={(text) => {
                    setPlusTemperature(Number.parseInt(text));
                }}/>
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputCount')}
                           placeholderTextColor={'#999'} onChangeText={(text) => {
                    setPlusCount(Number.parseInt(text));
                }}/>
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputBalloonValue')}
                           placeholderTextColor={'#999'} onChangeText={(text) => {
                    setPlusValue(Number.parseInt(text));
                }}/>
                <Pressable onPress={() => {
                    let plusV = ((plusValue * plusCount) * findK(plusPressure, plusTemperature));
                    for (const element of remainder) {
                        if (element.name === plusGas.name) {
                            element.value = Number.parseInt(element.value) + plusV;
                            element.history.unshift({pressure: plusPressure.density, temperature: plusTemperature, count: plusCount, value: plusValue, result: plusV, date: new Date()})
                        }
                    }
                    setData(remainder).catch(error => console.error(error));
                    setPlusVisible(false);
                }} style={{...styles.submit, left: 0}}>
                    <Text style={{textAlign: 'center'}}>{t('Save')}</Text>
                </Pressable>
            </MyModal>
            <MyModal animationType={'fade'} visible={minusVisible} requestClose={() => {
                setMinusVisible(false);
                setSelectedGas({});
            }} title={t('Minus')}>
                <SelectDropdown
                    renderButton={(selectedItem, isOpened) => {
                        if (selectedItem) {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <View style={styles.dropdownPlaceholderStyle}>
                                        <Text style={{...styles.dropdownPlaceholderStyle, color: '#000'}}>
                                            {selectedItem.name}
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
                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                            </View>
                        );
                    }}
                    onSelect={(selectedItem) => {
                        setMinusGas(selectedItem);
                    }}
                    defaultValue={findGas(minusGas)}
                    data={p}/>
                <SelectDropdown
                    renderButton={(selectedItem, isOpened) => {
                        if (selectedItem) {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <View style={styles.dropdownPlaceholderStyle}>
                                        <Text style={{...styles.dropdownPlaceholderStyle, color: '#000'}}>
                                            {selectedItem.density}
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
                                            {t('Select Pressure')}
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
                                <Text style={styles.dropdownItemTxtStyle}>{item.density}</Text>
                            </View>
                        );
                    }}
                    onSelect={(selectedItem) => {
                        setMinusPressure(selectedItem);
                    }}
                    data={minusGas.pressures}/>
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputTemperature')}
                           placeholderTextColor={'#999'}
                           onChangeText={text => {
                               setMinusTemperature(Number.parseInt(text));
                           }}/>
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputCount')}
                           placeholderTextColor={'#999'} onChangeText={text => {
                    setMinusCount(Number.parseInt(text));
                }}/>
                <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={t('InputBalloonValue')}
                           placeholderTextColor={'#999'} onChangeText={text => {
                               setMinusValue(Number.parseInt(text));
                           }}/>
                <Pressable onPress={() => {
                    let minusV = (minusValue * minusCount) * findK(minusPressure, minusTemperature);
                    for (const element of remainder) {
                        if (element.name === minusGas.name) {
                            if (element.value > minusV) {
                                element.value = Number.parseInt(element.value) - (minusV);
                                element.history.unshift({
                                    pressure: minusPressure.density,
                                    temperature: minusTemperature,
                                    count: minusCount,
                                    value: minusValue,
                                    result: minusV * -1,
                                    date: new Date(),
                                });
                                setRemainder(remainder);
                                setData(remainder).catch(error => console.error(error));
                                setMinusVisible(false);
                                return ;
                            }
                        }
                    }
                }} style={{...styles.submit, left: 0}}>
                    <Text style={{textAlign: 'center'}}>{t('Save')}</Text>
                </Pressable>
            </MyModal>
            <MyModal animationType={'fade'} visible={historyVisible} requestClose={() => {
                setHistoryVisible(false);
            }} title={selectedGas.name} item={selectedGas}>
                <ScrollView>
                    {selectedGas.history && selectedGas.history.length > 0 && selectedGas.history.map((item, index) => {
                        return (
                            <View key={index} style={{width: '100%'}}>
                                <Pressable onPress={() => {
                                    navigation.push("remainderView")
                                    console.log(item);
                                }}>
                                    <Text style={item.result > 0 ? {color: '#393'} : {color: '#000'}}>{item.result > 0 ? '+' + item.result : '-' + item.result }</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </ScrollView>
            </MyModal>
            <Text onPress={() => {
                setPlusVisible(true);
            }} style={styles.submit}>{t('Add Gas')}</Text>
            <View>
                <View>
                    {remainder && remainder.map((item, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <View style={styles.cardContainer}>
                                    <Pressable onPress={() => {
                                        navigation.push("remainderView", {
                                            selectedGas: item
                                        })
                                    }}>
                                        <Text style={styles.cardText}>{item.name}</Text>
                                        <Text style={styles.cardText}>{Math.floor(item.value * 10000) / 10000} {t("CubicMeter-small")}</Text>
                                    </Pressable>
                                </View>
                                <Pressable onPress={() => {
                                    if (item.value > 0) {
                                        setMinusGas(findGas(item));
                                        setMinusVisible(true);
                                    }
                                }}>
                                    <Text style={{textAlign: 'center', color: '#000'}}>{t('Minus')}</Text>
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
            </View>
            <Pressable onPress={value => {
                Alert.alert(t("Are you sure?"), t("All saved data will be deleted"), [
                    {
                        text: t("Yes"),
                        onPress: () => {
                            const defaultValue = [{name: t('Helium'), value: 0, history: []}];
                            setRemainder(defaultValue);
                            setData(defaultValue).then(r => console.log(r));
                        }
                    }, {
                        text: t('Cancel'),
                    }
                ])
            }}>
                <Text style={{...styles.cardText, textAlign: 'center'}}>{t('Reset')}</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
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
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    modalHeader: {
        position: 'relative',
        height: 50,
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 10,
        fontSize: 48,
        color: '#000',
    },
    text: {
        paddingVertical: 8,
        width: '100%',
        height: 40,
        color: '#FFF',
        textAlign: 'center',
        backgroundColor: '#666',
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        width: '100%',
        padding: 5,
        paddingHorizontal: 15,
        margin: 8,
        color: '#000',
        elevation: 8,
        backgroundColor: '#fff',
    },
    view: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: 'column',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '94%',
        height: 70,
        paddingHorizontal: 15,
        elevation: 10,
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 15,
    },
    cardText: {
        color: '#000',
        fontSize: 14,
    },
    submit: {
        elevation: 5,
        backgroundColor: '#5599EE',
        paddingVertical: 5,
        width: '50%',
        left: '25%',
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 10,
    }
});
