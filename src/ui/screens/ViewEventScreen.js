import {Text, StyleSheet, ScrollView, Dimensions, View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import Event from '../classes/Event'
import AutoHeightWebView from "react-native-autoheight-webview";

export default function ViewEventScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();
    const {width} = Dimensions.get("window")
    const customCss = `img { display: none !important; font-size: 12px; } p { margin-bottom: 0 !important; padding-right: 30px; color: "#000"; font-size: 14px; } br { content: " "; display: block; margin-bottom: 20px; }`;

    useEffect(() => {
        setLoading(true)
        navigation.setOptions({
            title: t('Event`s details')
        })
        axios.get(`https://tgko.ru/api/v1/events/${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                const e = new Event(response.data[route.params.id]);
                setEvent(e);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                setError(true);
                setErrorDescription(t('No data found'));
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <ScrollView style={{padding: 0, margin: 20}}>
            {loading ? <ActivityIndicator size={"large"} color={"#007BFF"} /> :
                <>
                    <Text style={styles.container}>
                        <Text style={[styles.text, styles.header]}>{event.title}</Text>
                    </Text>
                    <View style={styles.container}>
                        <Image src={`https://tgko.ru/${event.image}`} srcSet={`https://tgko.ru/${event.image}`}
                               style={{width: "100%", height: 90}} resizeMode={'cover'} resizeMethod={'scale'} />
                    </View>
                    <View style={styles.container}>
                        <AutoHeightWebView style={{width: width - 15}} source={{html: event.content}} customStyle={customCss} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>{t("startDate")}: {event.start ? event.start.toLocaleDateString() : ""}</Text>
                        <Text style={styles.text}>{t("endDate")}: {event.end ? event.end.toLocaleDateString() : ""}</Text>
                    </View>
                </>
            }
            {error &&
                <>
                    <Text style={styles.error}>{errorDescription}</Text>
                </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    text: {
        color: '#000',
        paddingVertical: 5,
        textAlign: 'justify',
    },
    error: {
        width: '100%',
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'red',
    },
    header: {
        fontWeight: 'bold',
    },
    sub: {
        fontStyle: 'italic',
    },
});
