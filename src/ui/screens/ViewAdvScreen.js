import {Text, View, StyleSheet, ScrollView, Pressable, Linking, ActivityIndicator, Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import AutoHeightWebView from "react-native-autoheight-webview";

export default function ViewAdvScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [adv, setAdv] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true)
        navigation.setOptions({
            title: t('Adv Details'),
        });
        // console.log(route.params.id)
        axios.get(`https://tgko.ru/api/v1/adverts/get/${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                console.log(response.data.advert)
                setAdv(response.data.advert);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                setError(true);
                setErrorDescription(t('No data found'));
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
        };
    }, []);
    const {width, height} = Dimensions.get("window");
    const customCss = `img { font-size: 12px; width: 100% } p { padding-right: 10px; } br { content: " "; display: block; margin-bottom: 10px; }`;
    return (
        <ScrollView style={styles.container}>
            {!loading ? <>
            <Text style={[styles.text, styles.header, {paddingBottom: 20}]}>{adv.title}</Text>
                <AutoHeightWebView style={{width: width - 15, marginBottom: 40}} source={{html: adv.content}} customStyle={customCss} />
            <View style={{paddingBottom: 30}}>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('author')}: </Text>
                    <Text style={[styles.text, styles.textItalic]}>{adv.advert_name}</Text>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('email')}: </Text>
                    <Pressable onPress={event => {
                        Linking.openURL(`mailto:${adv.advert_email}`);
                    }}>
                        <Text style={[styles.text, styles.textItalic]}>{adv.advert_email}</Text>
                    </Pressable>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.text}>{t('phone')}: </Text>
                    <Pressable onPress={event => {
                        Linking.openURL(`tel:${adv.advert_phone}`);
                    }}>
                        <Text style={[styles.text, styles.textItalic]}>{adv.advert_phone}</Text>
                    </Pressable>
                </View>
            </View>
            </> : <ActivityIndicator size={"large"} />}
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
