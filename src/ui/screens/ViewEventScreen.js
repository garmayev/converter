import {Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {baseUrl} from '../../const';
import axios from 'axios';

export default function ViewEventScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}/event/view?id=${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                console.log(response);
                setEvent(response);
                setLoading(true);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setError(true);
                setErrorDescription(t('No data found'));
            });
    }, []);

    return (
        <View style={{padding: 15}}>
            {loading &&
                <>
                    <Text style={styles.text}>
                        <Text style={styles.header}>Title: </Text>
                        <Text>{event.title}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.header}>Description: </Text>
                        <Text>{event.description}</Text>
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.header}>Date: </Text>
                        <Text>{(new Date(event.date * 1000)).toLocaleString()}</Text>
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
});
