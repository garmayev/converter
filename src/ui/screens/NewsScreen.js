import {
    Animated,
    Dimensions, Image, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import News from '../classes/News';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import DynamicHeader from '../components/DynamicHeader';

export default function NewsScreen({route, navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const {t} = useTranslation();
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const request = () => {
        axios.get(`https://tgko.gasgo.pro/web/api/post/index?sort=-created_at`, {
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

    useEffect(() => {
        request();
        const intervalId = setInterval(() => {
            request();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    function show(element) {
        // navigation.navigate('modal', {screen: 'ViewNews', params: {item: JSON.stringify(element)}});
        setSelectedItem(element);
        setModalActive(true);
    }

    const scrollViewTop = scrollOffsetY.interpolate({
        inputRange: [0, 100],
        outputRange: [120, 50],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{minHeight: Dimensions.get('window').height}}>
            <DynamicHeader title={t('News')} description={''}
                           animatedValue={scrollOffsetY} step={100}
            />
            <Animated.View style={{
                top: scrollViewTop,
                // paddingBottom: 20
            }}>
                <ScrollView
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingHorizontal: 5,
                        marginBottom: 100,
                        // paddingBottom: 40
                    }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollOffsetY}}}], {useNativeDriver: false})}
                >
                    {loading &&
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.card} onPress={() => {
                                    navigation.navigate('ViewNews', {id: item.id});
                                }} key={index}>
                                    <View style={styles.cardContainer}>
                                        <Image
                                            style={styles.cardPicture}
                                            resizeMode={'cover'}
                                            source={{uri: item.picture}}/>
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
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: '100%',
        minHeight: 205,
        flexDirection: 'column',
        padding: 5,
        paddingBottom: 5,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#CCC',
    },
    cardItem: {
        width: '100%',
        padding: 5,
    },
    cardTitle: {
        textAlign: 'center',
        paddingHorizontal: 5,
        fontFamily: 'Roboto-Regular',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#fff',
    },
    modalInnerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalCloseBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        padding: 5,
        zIndex: 999,
    },
    modalTitle: {
        paddingTop: 10,
        fontSize: 24,
        color: '#000',
        paddingHorizontal: 15,
    },
    modalSummary: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    modalDate: {
        color: '#000',
        fontStyle: 'italic',
    },
    modalText: {
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    modalAuthor: {
        color: '#000',
        fontStyle: 'italic',
    },

});
