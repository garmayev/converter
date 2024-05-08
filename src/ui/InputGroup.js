import {TextInput, View, StyleSheet, Text, Button, Keyboard} from 'react-native';
import {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export function InputGroup({
    labelText,
    inputType,
    onPress,
    data,
    onSelect,
    value,
    onTextChange
                           }) {
    const [label, setLabel] = useState(labelText ?? '');
    const [type, setType] = useState(inputType ?? 'text');

    function renderType(params) {
        switch (params) {
            case 'text':
                return (
                    <>
                        {label && <Text style={styles.inputLabel}>{label}</Text>}
                        <TextInput
                            style={styles.inputText}
                            onChangeText={onTextChange}
                        >
                            {value}
                        </TextInput>
                    </>);
            case 'dropdown':
                return (
                    <>{label && <Text style={styles.inputLabel}>{label}</Text>}
                        <SelectDropdown
                            onSelect={(selectedItem, index) => {
                                if (onSelect) {
                                    onSelect.call(this, selectedItem, index);
                                }
                            }}
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
                            data={data} style={styles.inputText}/>
                    </>);
            case 'button':
                return (
                    <Button title={label} onPress={onPress} style={styles.inputSubmit} />
                )
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
    inputContainer: {
        width: '100%',
        marginTop: 15,
    },
    inputSubmit: {
        zIndex: 999,
        width: '60%',
        backgroundColor: '#0C68A9',
    },
});
