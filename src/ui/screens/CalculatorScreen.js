import {useTranslation} from 'react-i18next';
import {
    StyleSheet,
    Keyboard,
    Text,
    View, ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container';
import {InputGroup} from '../components/InputGroup';

export default function CalculatorScreen({navigation}) {
    const {t} = useTranslation();

    const
        P = 101325,
        R = 8.314462,
        gases = [
            {title: t('Oxygen'), moll: 0.032, density: 1.141},
            {title: t('Argon'), moll: 0.039944, density: 1.392},
            {title: t('Nitrogen'), moll: 0.028016, density: 0.808},
            {title: t('Air'), moll: 0.02896, density: 0.873},
            {title: t('Hydrogen'), moll: 0.0020156, density: 0.0708},
            {title: t('Helium'), moll: 0.004003, density: 0.1249},
            {title: t('CarbonDioxide'), moll: 0.04401, density: 1.0234},
            {title: t('Methane'), moll: 0.01604, density: 0.415},
        ],
        scales = [
            {value: 1, title: t('Kg')},
            {value: 2, title: t('L')},
            {value: 3, title: t('CubicMeter')},
        ];

    const [selectedGas, setSelectedGas] = useState(gases[0]);
    const [selectedScale, setSelectedScale] = useState(scales[0]);
    const [temperature, setTemperature] = useState(25);
    const [count, setCount] = useState(1);
    const [result, setResult] = useState([]);
    const calculate = (gas, temperature, scale, count) => {
        const afterDot = 7;

        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        let r;

        switch (scale.value) {
            case 1:
                r = [
                    {title: t('Weight'), value: count.toFixed(afterDot)},
                    {title: t('Liquid'), value: (count / gas.density).toFixed(afterDot)},
                    {title: t('Gas'), value: (count / getDensity(gas, temperature)).toFixed(afterDot)},
                ];
                break;
            case 2:
                r = [
                    {title: t('Weight'), value: (count * gas.density).toFixed(afterDot)},
                    {title: t('Liquid'), value: count.toFixed(afterDot)},
                    {title: t('Gas'), value: ((count * gas.density) / getDensity(gas, temperature)).toFixed(afterDot)},
                ];
                break;
            case 3:
                r = [
                    {title: t('Weight'), value: (count * getDensity(gas, temperature)).toFixed(afterDot)},
                    {title: t('Liquid'), value: (count * getDensity(gas, temperature) / gas.density).toFixed(afterDot)},
                    {title: t('Gas'), value: count.toFixed(afterDot)},
                ];
                break;
            default:
                break;
        }

        setResult(r);
    };

    return (
        <Container>
            <ScrollView style={{paddingHorizontal: 30}}>
                <InputGroup labelText={t('SelectGas')} inputType={'dropdown'} data={gases}
                            value={gases[0]}
                            onSelect={(selectedItem, index) => {
                                setSelectedGas(gases[index]);
                            }}/>
                <InputGroup labelText={t('InputTemperature')} inputType={'text'} value={temperature}
                            onTextChange={setTemperature}/>
                <InputGroup labelText={t('SelectScale')} inputType={'dropdown'} data={scales}
                            value={scales[0]}
                            onSelect={(selectedItem, index) => {
                                setSelectedScale(scales[index]);
                            }}/>
                <InputGroup labelText={t('InputValue')} inputType={'text'} value={count}
                            onTextChange={setCount}/>
                <InputGroup labelText={t('Calculate')} inputType={'button'} onPress={() => {
                    Keyboard.dismiss();
                    calculate(selectedGas, (Number.parseFloat(temperature)), selectedScale, (Number.parseFloat(count)));
                }}/>
                <View style={{padding: 30, flex: 1, flexDirection: 'column'}}>
                    {result && result.map((item, index) => {
                        return (
                        <View style={{width: '100%', flex: 1, flexDirection: 'row'}} key={index}>
                            <Text style={{
                                width: '50%',
                                textAlign: 'right',
                                paddingRight: 10,
                                fontSize: 16,
                                color: '#000',
                            }}>{item.title}</Text>
                            <Text style={{
                                width: '50%',
                                textAlign: 'left',
                                paddingLeft: 10,
                                fontSize: 16,
                                color: '#000',
                            }}>{item.value}</Text>
                        </View>);
                    })}
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    text: {
        paddingVertical: 10,
    },
    submit: {
        marginTop: 15,
        padding: 10,
        zIndex: 999,
    },
    colLeft: {
        width: '50%',
        textAlign: 'right',
        paddingRight: 5,
        color: '#000',
    },
    colRight: {
        width: '50%',
        textAlign: 'left',
        paddingLeft: 5,
        color: '#000',
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        color: '#000',
    },
});
