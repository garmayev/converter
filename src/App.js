/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import Container from './ui/Container';
import {InputGroup} from './ui/InputGroup';
import {Button, FlatList, StyleSheet, Text, View, Keyboard} from 'react-native';

const
    P = 101325,
    R = 8.314462,
    gases = [
        {title: 'Кислород', moll: 0.032, density: 1.141},
        {title: 'Аргон', moll: 0.039944, density: 1.392},
        {title: 'Азот', moll: 0.028016, density: 0.808},
        {title: 'Воздух', moll: 0.02896, density: 0.873},
        {title: 'Водород', moll: 0.0020156, density: 0.0708},
        {title: 'Гелий', moll: 0.004003, density: 0.1249},
        {title: 'Углекислота', moll: 0.04401, density: 1.0234},
        {title: 'Метан', moll: 0.01604, density: 0.415},
    ],
    scales = [
        {value: 1, title: 'Килограмм'},
        {value: 2, title: 'Литр'},
        {value: 3, title: 'Кубический метр'},
    ];

const Item = ({item}) => (
    <View style={styles.itemContainer}>
        <Text style={styles.colLeft}>{item.title}</Text>
        <Text style={styles.colRight}>{item.value.toFixed(6)}</Text>
    </View>
);

function App() {
    const [selectedGas, setSelectedGas] = useState();
    const [selectedScale, setSelectedScale] = useState();
    const [temperature, setTemperature] = useState(25);
    const [count, setCount] = useState(1);
    const [result, setResult] = useState([]);

    function calculate(gas, temperature, scale, count) {
        function getKelvinTemperature(temp) {
            return temp + 273.15;
        }

        function getDensity(gas, temp) {
            console.log(getKelvinTemperature(temp));
            return (P * gas.moll) / (R * getKelvinTemperature(temp));
        }

        let t;

        switch (scale.value) {
            case 1:
                t = [
                    {title: 'Масса', value: count},
                    {title: 'Жидкость', value: (count / gas.density)},
                    {title: 'Газ', value: (count / getDensity(gas, temperature))},
                ];
                break;
            case 2:
                t = [
                    {title: 'Масса', value: (count * gas.density)},
                    {title: 'Жидкость', value: count},
                    {title: 'Газ', value: (count * gas.density) / getDensity(gas, temperature)},
                ];
                break;
            case 3:
                t = [
                    {title: 'Масса', value: (count * getDensity(gas, temperature))},
                    {title: 'Жидкость', value: (count * getDensity(gas, temperature) / gas.density)},
                    {title: 'Газ', value: count},
                ];
                break;
            default:
                break;
        }

        setResult(t);
    }

    return (
        <Container>
            <InputGroup labelText={'Выберите газ'} inputType={'dropdown'} data={gases}
                        onSelect={(selectedItem, index) => {
                            setSelectedGas(gases[index]);
                        }}/>
            <InputGroup labelText={'Введите температуру (C)'} inputType={'text'} value={temperature}
                        onTextChange={setTemperature}/>
            <InputGroup labelText={'Выберите ед.изм.'} inputType={'dropdown'} data={scales}
                        onSelect={(selectedItem, index) => {
                            setSelectedScale(scales[index]);
                        }}/>
            <InputGroup labelText={'Введите количество'} inputType={'text'} value={count} onTextChange={setCount}/>
            <InputGroup labelText={'Рассчитать'} inputType={'button'} onPress={() => {
                Keyboard.dismiss();
                console.log("calculate");
                calculate(selectedGas, (temperature * 1), selectedScale, (count * 1));
            }}/>
            <View style={{zIndex: 999}}>
                <FlatList data={result} renderItem={Item} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
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

export default App;
