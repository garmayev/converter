import {
    ActivityIndicator,
    Dimensions, FlatList, Image, Pressable, SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt, faCalendarDay} from '@fortawesome/free-solid-svg-icons';

axios.defaults.timeout = 999999999999;

export default function NewsScreen({route, navigation, isFilter = false, setFilter = () => {}}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    const request = (page) => {
        setLoading(false)
        // console.log("Request is started")
        axios({
            url: `https://tgko.ru/api/v1/news`,
            method: 'get',
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const responseData = response.data;
                const result = [];

                if (responseData.success) {
                    // setData(responseData.data.news)
                    for (const key in responseData.data.news) {
                        result.push(responseData.data.news[key])
                    }
                    setData(result.reverse())
                }
                setLoading(true)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                console.log("Request is done")
            })
    };

    useEffect(() => {
        // request(page);
        request()
        return () => {
        };
    }, []);


    const Item = (item) => {
        const data = item.item;
        return (
            <Pressable style={styles.card} onPress={() => {
                navigation.navigate('ViewNews', {id: data.id});
            }}>
                <View style={styles.cardContainer}>
                    <Image style={{height: 150, borderRadius: 10, marginBottom: 10}} resizeMode={'cover'} source={{uri: `https://tgko.ru/${data.news_image}`}} />
                    <Text style={{fontStyle: 'italic', fontSize: 16, color: '#666', paddingBottom: 15, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faCalendarDay} color={"#999"} size={16} />
                        {(new Date(data.createdon * 1000)).toLocaleDateString()}
                    </Text>
                    <Text style={{color: '#000', fontWeight: 'bold'}}>{data.menutitle}</Text>
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
            {loading ?
                    <FlatList data={data} renderItem={Item}
                                  contentContainerStyle={isFilter ? {flexGrow: 1, paddingBottom: 80, paddingTop: 120} : {flexGrow: 1, paddingBottom: 80}}
                                  ListEmptyComponent={EmptyList} keyExtractor={(item, index) => index} />
            : <ActivityIndicator size={"large"} color={"#007BFF"} styles={{marginVertical: 20, paddingVertical: 20}} />}
        </SafeAreaView>
    );
}

const shadow = {
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 7,
};
const styles = StyleSheet.create({
    container: { padding: 16 },
    card: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        padding: 5,
        marginTop: 4,
        marginBottom: 10,
    },
    cardContainer: {
        borderRadius: 15,
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderColor: '#CCC',
        ...shadow,
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
