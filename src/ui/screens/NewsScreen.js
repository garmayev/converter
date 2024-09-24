import {
    Animated,
    Dimensions, FlatList, Image, Platform, Pressable, SafeAreaView,
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
    const {t} = useTranslation();
    const isIos = () => {
        return Platform.OS === 'ios';
    };
    const scrollOffsetY = useRef(new Animated.Value(isIos() ? 0 : 40)).current;

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
                setError(false);
                setErrorDescription('');
            } else {
                setError(true);
                setErrorDescription(t('No data found'));
            }
        }).catch(error => {
            setError(error.message);
        }).finally(() => {
            setLoading(true)
        })
    };

    useEffect(() => {
        request();
        const intervalId = setInterval(() => {
            request();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const Item = (item) => {
        const data = item.item;
        return (
            <Pressable style={styles.card} onPress={() => {
                navigation.navigate('ViewNews', {id: data.id});
            }}>
                <View style={styles.cardContainer}>
                    <Image
                        style={styles.cardPicture}
                        resizeMode={'cover'}
                        source={{uri: data.picture}}/>
                    <View style={styles.cardItem}>
                        <Text style={styles.cardTitle}>{data.title}</Text>
                    </View>
                </View>
            </Pressable>
        );
    };
    const EmptyList = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{t('No data found')}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{minHeight: Dimensions.get('window').height}}>
            <DynamicHeader title={t('News')} description={''} start={isIos()}
                           animatedValue={scrollOffsetY} step={50}
            />
            {loading && <FlatList data={data} renderItem={Item} contentContainerStyle={{flexGrow: 1}}
                       ListEmptyComponent={EmptyList}/>}
            {!loading && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>{errorDescription}</Text></View>}
        </SafeAreaView>
    );
}

const shadow = {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 7
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
        borderColor: '#CCC',
        ...shadow
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
