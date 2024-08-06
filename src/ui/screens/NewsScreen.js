import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';
import {baseUrl} from '../../const';
import News from '../classes/News';
import {useTranslation} from 'react-i18next';
import {SharedElement} from 'react-navigation-shared-element';

export default function NewsScreen({route, navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    const request = () => {
        axios.get(`${baseUrl}/post/index?sort=-created_at`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            let d = [];
            if (response.length) {
                for (const key in response) {
                    d.push(new News(response[key]));
                }
                setData(d);
                setLoading(true);
                setError(false);
                setErrorDescription('');
            } else {
                setError(true);
                setErrorDescription(t('No data found'));
                setLoading(false);
            }
        }).catch(error => {
            console.error(error);
        });
    };

    const customTransition = SharedTransition.custom((values) => {
        'worklet';
        return {
            height: withSpring(values.targetHeight),
            width: withSpring(values.targetWidth),
            originX: withSpring(values.targetOriginX),
            originY: withSpring(values.targetOriginY),
        };
    });

    useEffect(() => {
        navigation.setOptions({
            title: t('News'),
        });
        request();
        const intervalId = setInterval(() => {
            request();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    function show(element) {
        navigation.navigate(t('View News'), {item: JSON.stringify(element)});
    }

    return (
        <ScrollView>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                maxWidth: Dimensions.get('window').width,
                flexWrap: 'wrap',
                paddingHorizontal: 5,
                paddingBottom: 70,
            }}>
                {loading &&
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => {
                                // show(item);
                                navigation.navigate(t('View News'), {
                                    item: JSON.stringify(item),
                                    sharedElements: [
                                        {
                                            id: `item_${item.id}`,
                                            uri: item.picture,
                                        },
                                    ],
                                });
                                navigation.setOptions({
                                    title: item.title,
                                    headerBackTitle: null,
                                });

                            }} key={index}>
                                <View style={styles.cardContainer}>
                                    <SharedElement id={`item_${item.id}`}>
                                        <Animated.Image
                                            sharedTransitionTag={`view_${item.id}`}
                                            sharedTransitionStyle={customTransition}
                                            style={styles.cardPicture}
                                            resizeMode={'cover'}
                                            source={{uri: item.picture}}/>
                                    </SharedElement>
                                    <View style={styles.cardItem}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
                {error &&
                    <Text style={{
                        width: '100%',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        color: 'red',
                    }}>{errorDescription}</Text>
                }
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    card: {
        padding: 5,
        paddingBottom: 5,
        width: '100%',
    },
    cardContainer: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#CCC',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    cardItem: {
        width: '100%',
        padding: 5,
    },
    cardTitle: {
        textAlign: 'center',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    cardPicture: {
        height: 150,
        borderRadius: 20,
    },
    cardDate: {
        fontSize: 14,
        textAlign: 'right',
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: '#fff',
    },
});
