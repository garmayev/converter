import {Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {baseUrl} from '../../const';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

export default function ViewEventScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: t('Event`s details')
        })
        axios.get(`${baseUrl}/event/view?id=${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                setEvent(response);
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
        <View style={{padding: 15}}>
            {loading &&
                <>
                    <Text style={styles.text}>
                        <Text style={styles.header}>{event.title}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text>{event.description}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.sub}>{(new Date(event.date * 1000)).toLocaleDateString()}</Text>
                    </Text>
                </>
            }
            {error &&
                <>
                    <Text style={styles.error}>{errorDescription}</Text>
                </>
            }
        </View>
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
