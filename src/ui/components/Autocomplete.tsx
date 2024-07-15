import {FlatList, Text, TextInput, View, StyleSheet, SafeAreaView, Pressable, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Input from './Input';

export default function Autocomplete({data, placeholder, renderItem}) {
    const [input, setInput] = useState('');
    const [filteredList, setFilteredList] = useState<Input[]>(data);
    const [status, setStatus] = useState(false);

    const onChangeText = (value) => {
        setInput(value)
        setFilteredList(data)
        console.log(value);
    };
    const onSelect = (value) => {
        console.log(value);
    };

    return (
        <View style={styles.autoCompleteContainer}>
            <TextInput placeholder={placeholder} onChangeText={onChangeText} style={styles.autoCompleteTextField}
                       placeholderTextColor={'#000'}/>
            <SafeAreaView>
                <FlatList data={filteredList} renderItem={(item, index) => {
                    return (
                            <TouchableOpacity onPress={onSelect}>
                                <Text style={styles.autoCompleteItemText}>{item.title}</Text>
                            </TouchableOpacity>
                    );
                }} style={styles.autoCompleteFlatList}/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    autoCompleteContainer: {},
    autoCompleteTextField: {
        color: '#000',
    },
    autoCompleteItem: {},
    autoCompleteItemText: {
        color: '#000',
    },
    autoCompleteFlatList: {
        color: '#000',
    },
});
