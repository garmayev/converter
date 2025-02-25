import {Text, StyleSheet, ScrollView, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import AutoHeightWebView from "react-native-autoheight-webview";

export default function ViewEventScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();
    const {width} = Dimensions.get('window');
    const customCss = `img { display: none !important; font-size: 12px; } p { padding-right: 10px; color: "#000"; font-size: 14px; } br { content: " "; display: block; margin-bottom: 10px; }`;

    useEffect(() => {
        navigation.setOptions({
            title: t('Event`s details')
        })
        axios.get(`https://tgko.ru/api/v1/events/${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                setEvent(response.data[route.params.id]);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                setError(true);
                setErrorDescription(t('No data found'));
            })
            .finally(() => {
                setLoading(true);
            })
    }, []);

    return (
        <ScrollView style={{padding: 0, paddingHorizontal: 20}}>
            {loading &&
                <>
                    <Text style={styles.text}>
                        <Text style={styles.header}>{event.title}</Text>
                    </Text>
                    <Text style={[styles.text, {marginBottom: 20}]}>
                        <Text>{event.introtext}</Text>
                    </Text>
                    <View>
                        <Text style={styles.text}>{t("startDate")}: {event.event_start}</Text>
                        <Text style={styles.text}>{t("endDate")}: {event.event_end}</Text>
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
    text: {
        color: '#000',
        paddingVertical: 5,
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
