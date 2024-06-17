import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {InputGroup} from '../components/InputGroup';
import {ScrollView, View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import {LogoText} from '../components/Logo';

export default function CalculatorScreen({navigation}) {
    const {t} = useTranslation();
    const gases = [
        {title: t('Gas Nitrogen and liquid Nitrogen'), moll: 0.032, density: 1.141},
        {title: t('Argon'), moll: 0.039948, density: 1.392},
        {title: t('Oxygen'), moll: 0.028016, density: 0.808},
        {title: t('Gas Helium'), moll: 0.02896, density: 0.873},
    ];
    const [gas, setGas] = useState(gases[0]);
    const [pressure, setPressure] = useState(1);
    const [temperature, setTemperature] = useState(-30);
    const [value, setValue] = useState(1000);
    const [result, setResult] = useState({value: Number(0).toFixed(6), K: Number(0).toFixed(6)});

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTransparent: true,
    //         headerStyle: {
    //             backgroundColor: 'transparent',
    //         },
    //     })
    // }, []);

    return (
        <Container>
            <ScrollView>
                <View>
                    <Image style={styles.bgHeader} source={require('../../assets/bg-car.png')} resizeMethod={'resize'} />
                    <LogoText style={styles.headerLogo}/>
                </View>
                <InputGroup labelText={t('SelectGas')} inputType={'dropdown'} data={gases}
                            value={gases[0]}
                            onSelect={(selectedItem, index) => {
                                setGas(gases[index]);
                            }}/>
                <InputGroup labelText={t('Pressure')} inputType={'text'}
                            value={pressure}
                            onTextChange={(e) => {
                                setPressure(e);
                            }} append={'атм'}/>
                <InputGroup labelText={t('Temperature')} inputType={'text'}
                            value={temperature}
                            onTextChange={(e) => {
                                setTemperature(e);
                            }} append={'C'}/>
                <InputGroup labelText={t('Balloon Value')} inputType={'text'}
                            value={value}
                            onTextChange={(e) => {
                                setValue(e);
                            }} append={'литры'}/>
                <View style={styles.result}>
                    <Text style={styles.resultHeader}>{t("Calculated indicators")}</Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.resultText}>{t("Gas Value")}:</Text>
                        <Text style={styles.resultValue}>{result.value}</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.resultText}>{t("Coefficient K")}:</Text>
                        <Text style={styles.resultValue}>{result.K}</Text>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        margin: 0
    },
    result: {
        margin: 20,
        borderRadius: 8,
        backgroundColor: "rgba(255, 255, 255, .3)",
        height: 120,
        fontSize: 24,
        flex: 1,
    },
    resultText: {
        color: "#000",
        fontSize: 16,
        margin: 0,
        padding: 0
    },
    resultValue: {
        color: "#000"
    },
    resultHeader: {
        color: "#000",
        fontSize: 21,
        margin: 0,
        padding: 0,
        textAlign: "center"
    },
    headerLogo: {
        zIndex: 2,
        minHeight: 50,
        minWidth: 100,
        position: 'absolute',
        top: 0,
        right: 10,
        elevation: 10,
    },
    bgHeader: {
        width: "100%",
        height: 230
    }
})
