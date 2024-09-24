import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Animated,
    SafeAreaView, Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import DynamicHeader from '../components/DynamicHeader';
import {useRef} from 'react';

export default function AdvScreen({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const {t} = useTranslation();

    const request = () => {
        axios.get(`https://tgko.gasgo.pro/web/api/adv/index`, {
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
                setErrorDescription('');
                setLoading(true);
            } else {
                setError(true);
                setErrorDescription(t('No data found'));
                setLoading(false);
            }
        }).catch((error) => {
            setLoading(false);
        });
    };

    useEffect(() => {
        navigation.setOptions({
            title: t('Advertisements'),
        });
        request();
        const intervalId = setInterval(() => {
            request();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    function showItem(element) {
        // navigation.navigate('modal', {
        //     screen: 'ViewAdv',
        //     params: {
        //         id: element.id,
        //     },
        // });
        setSelectedItem(element);
        setModalActive(true);
    }

    const STEP = 100;

    const scrollViewTop = scrollOffsetY.interpolate({
        inputRange: [0, STEP],
        outputRange: [120, 50],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView>
            <DynamicHeader title={t('Advertisements')}
                           animatedValue={scrollOffsetY} step={STEP}
            />
                <Animated.View style={{
                    top: scrollViewTop,
                    marginBottom: 100,
                    paddingBottom: 10,
                }}>
                    <ScrollView
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 5,
                        }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollOffsetY}}}], {useNativeDriver: false})}
                    >
                        {loading && data.map((item, index) => {
                            return (
                                <Pressable key={index} onPress={() => {
                                    navigation.navigate('ViewAdv', {id: item.id});
                                    // showItem(item);
                                }}>
                                    <View style={styles.card}>
                                        <Text style={styles.cardText}>{item.title}</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
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
    container: {
        backgroundColor: '#E4E4E4',
        paddingVertical: 15,
        paddingBottom: 50,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        minHeight: 90,
        elevation: 5,
        borderRadius: 10,
    },
    cardText: {
        color: '#000',
        textAlign: 'center',
    },
    header: {
        padding: 15,
        paddingTop: 0,
        paddingBottom: 15,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    label: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    title: {
        color: '#000',
        marginTop: 50,
        paddingTop: 10,
        fontSize: 27,
        fontFamily: 'Roboto-Light',
        letterSpacing: 1,
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        zIndex: 9,
        marginBottom: 60,
    },
    modalInnerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        marginBottom: 10,

    },
    modalCloseBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        padding: 5,
        zIndex: 10,
    },
    modalTitle: {
        paddingTop: 10,
        fontSize: 24,
        color: '#000',
        paddingHorizontal: 15,
    },
    modalText: {
        fontSize: 14,
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    modalAuthor: {
        color: '#000',
        fontStyle: 'italic',
    },
    inline: {
        flex: 1,
        flexDirection: 'row',
    },
});
