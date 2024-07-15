import {FlatList, Text, TextInput, View, StyleSheet, SafeAreaView, Pressable, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Input from '../../types/Input';

export default function Autocomplete({data, placeholder, renderItem}) {
    const [input, setInput] = useState<String>('');
    const [filteredList, setFilteredList] = useState<Input[]>(data);
    const [status, setStatus] = useState<Boolean>(false);

    const onChangeText = (value) => {
        setInput(value)
        const regex = new RegExp(`${value.trim()}`, 'i')
        setFilteredList(data.filter((item) => {
            return item.title.search(regex) >= 0
        }))
    };
    const onSelect = (value) => {
        console.log(value.item)
        setInput(value.item.title)
        setStatus(false)
        setFilteredList(data)
    };

    return (
        <View style={styles.autoCompleteContainer}>
            <TextInput placeholder={placeholder}
                       defaultValue={input}
                       onChangeText={onChangeText}
                       style={styles.autoCompleteTextField}
                       onFocus={() => setStatus(true)}
                // onEndEditing={() => setStatus(false)}
                       placeholderTextColor={'#000'}/>
            <FlatList data={filteredList} renderItem={(element, index) => {
                return (
                    <View style={styles.autoCompleteItem}>
                        <TouchableOpacity onPress={(event) => {
                            onSelect(element)
                        }}>
                            <Text style={styles.autoCompleteItemText}>{element.item.title}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }} keyExtractor={item => item.uid} showVerticalScrollIndicator={true} style={
                status ? styles.showAutoCompleteFlatList : styles.hideAutoCompleteFlatList
            } scrollEnabled={false}/>
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
    showAutoCompleteFlatList: {
        color: '#000',
        flex: 1,
    },
    hideAutoCompleteFlatList: {
        display: 'none',
    }
});
