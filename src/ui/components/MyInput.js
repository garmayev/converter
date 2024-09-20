import {TextInput, StyleSheet, View, Text, LayoutAnimation} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function MyInput( {style = {}, callback, mode, defaultValue, label, rules = {}, append} ) {
    const [error, setError] = useState("");
    const [value, setValue] = useState(defaultValue);

    const inputStyleGenerate = () => {
        let res = {};
        if (error && error.length > 0) {
            res = Object.assign(style.input ?? {}, styles.input, style.errorInput ?? {}, styles.errorInput)
        } else {
            res = Object.assign(style.input ?? {}, styles.input);
        }
        return res;
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 1500)
    }, [error]);

    return (
        <View style={{...style.container, ...styles.container}}>
            {label && <Text style={Object.assign(style.label ?? {}, styles.label)}>{label}</Text>}
            <TextInput style={inputStyleGenerate()} onChangeText={(text) => {
                for (const rule of rules) {
                    if (!rule.condition(text)) {
                        if (rule.onErrorCallback) {
                            setValue(rule.onErrorCallback(text));
                        }
                        setError(rule.errorMessage)
                    }
                }
                callback(text)
            }} inputMode={mode ?? 'numeric'}>{value}</TextInput>
            <Text style={{...style.error, ...styles.error}}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    label: {
        paddingHorizontal: 5,
        paddingVertical: 3
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        elevation: 5,
        marginTop: 3,
        paddingVertical: 3,
        paddingHorizontal: 10,
        color: '#000',
        backgroundColor: '#fff',
        borderColor: '#CCC',
    },
    errorInput: {
        borderColor: '#933',
    },
    error: {
        color: '#933',
        fontSize: 12
    }
})
