import {Image, Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl} from '../../const';
import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

function ViewNewsScreen({route, navigation}) {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [date, setDate] = useState(0);
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: t('Details'),
        });
        let element = JSON.parse(route.params.item)
        setId(element._id);
        setTitle(element._title);
        setDescription(element._content);
        setPicture(element._picture);
        setAuthor(element._author);
        setDate(new Date(element._date));
        setLoading(true);
    }, []);


    // useEffect(() => {
    //     navigation.setOptions({
    //         title: t("Details")
    //     })
    //     axios.get(`${baseUrl}/post/view?id=${route.params.id}`, {
    //         header: {
    //             'Content-Type': 'application/json',
    //             'accept': 'application/json',
    //         },
    //     }).then(response => {
    //         return response.data;
    //     }).then(response => {
    //         if (response) {
    //             setId(response.id);
    //             setTitle(response.title);
    //             setDescription(response.body);
    //             setPicture(response.picture);
    //             setAuthor(response.author);
    //             setDate(new Date(response.created_at * 1000));
    //             setLoading(true);
    //         } else {
    //             setError(true)
    //             setErrorDescription("Missing any data")
    //             setLoading(false)
    //         }
    //     });
    // }, []);

    return (
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>
            {loading && !error &&
                <View>
                    <SharedElement id={`item_${id}`} >
                        <Animated.Image source={{uri: picture}} width={Dimensions.get("window").width} height={200} sharedTransitionTag={`view_${id}`} />
                    </SharedElement>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{description}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                        <Text style={styles.date}>{date.toLocaleDateString('ru-RU')}</Text>
                        <Text style={styles.author}>{author}</Text>
                    </View>
                </View>
            }
            {!loading && error &&
                <>
                    <Text style={styles.summary}>{errorDescription}</Text>
                </>
            }
        </ScrollView>
    );
}

ViewNewsScreen.sharedElements = route => {
    let item = JSON.parse(route.params.item)

    console.log("!!!")

    return [
        {
            id: `item_${item.id}`,
            animation: 'move',
            resize: 'clip'
        },
    ];
}

export default ViewNewsScreen

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        fontSize: 24,
        color: '#000',
        paddingHorizontal: 15
    },
    summary: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    date: {
        color: '#000',
        fontStyle: 'italic',
    },
    text: {
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    author: {
        color: '#000',
        fontStyle: 'italic'
    },
});
