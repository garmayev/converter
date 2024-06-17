import {TextInput, View, StyleSheet, Text, Button, Keyboard, Dimensions} from 'react-native';
import {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export function InputGroup({
                               labelText,
                               inputType,
                               onPress,
                               data,
                               onSelect,
                               value,
                               onTextChange,
                               style,
                               append = false,
                           }) {
    const [label, setLabel] = useState(labelText ?? '');
    const [type, setType] = useState(inputType ?? 'text');

    function renderType(params) {
        switch (params) {
            case 'text':
                return (
                    <View style={{paddingHorizontal: 10, ...style}}>
                        {label && <Text style={styles.inputLabel}>{label}</Text>}
                        <View style={styles.horizontal}>
                            <TextInput
                                style={append ? styles.inputText : styles.inputTextFull}
                                onChangeText={onTextChange}
                            >
                                {value}
                            </TextInput>
                            <Text style={styles.inputTextAppend}>{append}</Text>
                        </View>
                    </View>);
            case 'dropdown':
                return (
                    <View style={{paddingHorizontal: 10, ...style}}>
                        {label && <Text style={styles.inputLabel}>{label}</Text>}
                        <SelectDropdown
                            onSelect={(selectedItem, index) => {
                                if (onSelect) {
                                    onSelect.call(this, selectedItem, index);
                                }
                            }}
                            defaultValue={value}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || labelText}
                                        </Text>
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
                            data={data} style={append ? styles.inputText : styles.inputTextFull}/>
                    </View>);
            case 'button':
                return (
                    <View style={styles.inputSubmitContainer}>
                        <Button title={label} onPress={onPress}
                                style={append ? styles.inputText : styles.inputTextFull}/>
                    </View>
                );
        }
    }

    return (
        <View style={styles.inputContainer}>
            {renderType(type)}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
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
        width: '80%',
    },
    inputTextFull: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: '#000',
        height: 35,
        zIndex: 5,
        elevation: 5,
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginTop: 15,
    },
    inputSubmitContainer: {
        marginTop: 10,
        marginHorizontal: (Dimensions.get('screen').width * .4) / 2,
    },
    inputSubmit: {
        zIndex: 999,
        width: '100%',
        backgroundColor: '#0C68A9',
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        color: '#000',
    },
    inputTextAppend: {
        color: '#000',
        textAlign: 'center',
        paddingTop: 8,
        width: '19%',
    },
});
