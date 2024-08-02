import {Text, StyleSheet, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {baseUrl} from '../../const';
import axios from 'axios';

export default function ViewAdvScreen({route, navigation}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        console.log( `${baseUrl}/adv/view?id=${route.params.id}` );
        axios.get(`${baseUrl}/adv/view?id=${route.params.id}`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        })
            .then(response => response.data)
            .then(response => {
                setTitle(response.title);
                setDescription(response.description);
                setPhone(response.phone);
                setEmail(response.email);
                setName(response.name);
            })
            .catch(error => console.error(error))
    }, []);


    return (
        <ScrollView style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}>
            <Text style={styles.textContainer}>
                <Text style={styles.header}>Title: </Text>
                <Text style={styles.text}>{title}</Text>
            </Text>
            <Text style={styles.textContainer}>
                <Text style={styles.header}>Description: </Text>
                <Text style={styles.text}>{description}</Text>
            </Text>
            <Text style={styles.textContainer}>
                <Text style={styles.header}>Contact Phone: </Text>
                <Text style={styles.text}>{phone}</Text>
            </Text>
            <Text style={styles.textContainer}>
                <Text style={styles.header}>Contact Email: </Text>
                <Text style={styles.text}>{email}</Text>
            </Text>
            <Text style={{paddingBottom: 30, ...styles.textContainer}}>
                <Text style={styles.header}>Contact Name: </Text>
                <Text style={styles.text}>{name}</Text>
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        paddingBottom: 10,
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    text: {
        color: '#000',
    },
});
