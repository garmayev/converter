import {Image, Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function ViewNewsScreen({route, navigation}) {
    const baseUrl = 'https://clover.amgcompany.ru';
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [date, setDate] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const result = axios.get(`${baseUrl}/news/?id=${route.params.id}`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            setId(response.id)
            setTitle(response.title)
            setSummary(response.summary)
            setDescription(response.description)
            setPicture(response.picture)
            setDate(new Date(response.date * 1000))
            setLoading(true);
        });
    }, []);

    return (
        <ScrollView style={{flex: 1, flexDirection: 'column', paddingHorizontal: 15}}>
            {loading &&
                <>
                    <Image source={{uri: picture}} width={Dimensions.get("window").width - 20} height={200}/>
                    <Text style={styles.title}>{title} #{id}</Text>
                    <Text style={styles.summary}>{summary}</Text>
                    <Text style={styles.text}>{description}</Text>
                    <Text style={styles.date}>{date.toLocaleDateString('ru-RU')}</Text>
                </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        fontSize: 24,
        color: '#000',
    },
    summary: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#000',
        paddingVertical: 10,
    },
    date: {
        color: '#000',
    },
    text: {
        color: '#000',
    },
});
