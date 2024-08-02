import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {baseUrl} from '../../const';
import Ad from '../classes/Ad';

export default function AdvScreen({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    const request = () => {
        axios.get(`${baseUrl}/adv/index`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then((response) => {
            if (response.length) {
                setData(response);
                setError(false);
                setErrorDescription("")
                setLoading(true);
            } else {
                setError(true);
                setErrorDescription(t('No data found'));
                setLoading(false);
            }
        }).catch((error) => {
            setLoading(false);
        });
    }

    useEffect(() => {
        navigation.setOptions({
            title: t('Advertisements'),
        });
        request();
        setInterval(() => {
            request();
        }, 5000)
    }, []);

    function showItem(element) {
        navigation.navigate(t("View Adv"), {id: element.id})
    }

    return (
        <ScrollView>
            <View style={{
                paddingTop: 10,
                paddingBottom: 70,
            }}>
                {loading && data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            showItem(item)
                        }}>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {error &&
                    <Text style={{width: "100%", fontStyle:"italic", textAlign: 'center', color:'red'}}>{errorDescription}</Text>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4E4E4',
        paddingVertical: 15,
        paddingBottom: 50,
    },
    card: {
        padding: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        minHeight: 50,
    },
    cardText: {
        color: '#000',
        textAlign: 'center',
    },
});
