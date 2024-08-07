import {
    Animated,
    Dimensions, Image, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useSharedValue} from 'react-native-reanimated';
import {baseUrl} from '../../const';
import News from '../classes/News';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Modal, PaperProvider, Portal} from 'react-native-paper';
import {Gesture} from 'react-native-gesture-handler';
import {GestureDetector} from 'react-native-gesture-handler/src/handlers/gestures/GestureDetector';
import {useRef} from 'react';
import DynamicHeader from '../components/DynamicHeader';
import {useFocusEffect} from '@react-navigation/native';

const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 400;

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
        <SafeAreaView style={{minHeight: Dimensions.get("window").height}}>
            <DynamicHeader title={t('News')} description={'Последние новости журнала "Мир Газов"'}
                           animatedValue={scrollOffsetY} step={100}
            />
            <PaperProvider>
                <Animated.View style={{
                    top: scrollViewTop,
                    paddingBottom: 20
                }}>
                    <ScrollView
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 5,
                            marginBottom: 100,
                        }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollOffsetY}}}], {useNativeDriver: false})}
                    >
                        {loading &&
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity style={styles.card} onPress={() => {
                                        show(item);
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
                <Portal>
                    <MyModal data={selectedItem} active={modalActive} onClose={setModalActive}/>
                </Portal>
            </PaperProvider>
        </SafeAreaView>
    );
}

function MyModal({data, active, onClose}) {
    return (
        <Modal
            style={{
                zIndex: 99999,
                maxHeight: Dimensions.get('window').height,
            }}
            visible={active}
            onDismiss={() => {
                onClose(false);
            }}
            contentContainerStyle={styles.modalContainer}
            dismissable={true}
        >
            <View style={styles.modalInnerContainer}>
                <Image source={{uri: data._picture}} width={Dimensions.get('window').width} height={200}/>
                <TouchableOpacity onPress={() => {
                    onClose(false);
                }} style={styles.modalCloseBtn}>
                    <FontAwesomeIcon icon={faTimes} size={24}/>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{data._title}</Text>
                <Text style={styles.modalText}>{data._content}</Text>
                <View
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                    {/*<Text style={styles.modalDate}>{data._date}</Text>*/}
                    <Text style={styles.modalAuthor}>{data._author}</Text>
                </View>
            </View>
        </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    modalInnerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
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
