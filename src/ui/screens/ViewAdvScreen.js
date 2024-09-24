import {Text, View, StyleSheet, ScrollView, Pressable, Linking} from 'react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

export default function ViewAdvScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [adv, setAdv] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: t('Adv Details'),
        });
        axios.get(`https://tgko.gasgo.pro/web/api/adv/view?id=${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                setAdv(response);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                setError(true);
                setErrorDescription(t('No data found'));
            })
            .finally(() => {
                setLoading(true);
            });
        return () => {
        };
    }, []);
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.text, styles.header, {paddingBottom: 20}]}>{adv.title}</Text>
            <Text style={[styles.text, {paddingBottom: 20}]}>{adv.description && adv.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/&quot;/g, '"')}</Text>
            <View style={{paddingBottom: 30}}>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('author')}: </Text>
                    <Text style={[styles.text, styles.textItalic]}>{adv.name}</Text>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('email')}: </Text>
                    <Pressable onPress={event => {
                        Linking.openURL(`mailto:${adv.mail}`);
                    }}>
                        <Text style={[styles.text, styles.textItalic]}>{adv.email}</Text>
                    </Pressable>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('phone')}: </Text>
                    <Pressable onPress={event => {
                        Linking.openURL(`tel:${adv.phone}`);
                    }}>
                        <Text style={[styles.text, styles.textItalic]}>{adv.phone}</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        color: '#000',
        fontSize: 16,
        textAlign: 'justify'
    },
    textItalic: {
        fontStyle: 'italic',
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
    },
})
