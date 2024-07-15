import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {SharedTransition, withSpring} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';

const customTransition = SharedTransition.custom(
    (values) => {
        'worklet';
        return {
            height: withSpring(values.targetHeight),
            width: withSpring(values.targetWidth),
            originX: withSpring(values.targetOriginX),
            originY: withSpring(values.targetOriginY),
        };
    }
);

export default function NewsScreen({route, navigation}) {
    const baseUrl = 'https://clover.amgcompany.ru';
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const {t} = useTranslation();

    useEffect(() => {

        const result = axios.get(`${baseUrl}/news/?p=0`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            setData(response);
            setLoading(true);
        }).catch(error => {
            console.error(error)
        });
    }, []);

    function show(element) {
        // navigation.navigate("ViewNews", {id: element})
        navigation.push("ViewNews", {id:element})
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
                backgroundColor: '#E4E4E4',
            }}>
                {loading &&
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => {
                                // setFocusedIndex(index)
                                show(index)
                            }} key={index}>
                                <View style={styles.cardContainer}>
                                    <Animated.Image
                                        sharedTransitionTag={`${item.id}`}
                                        sharedTransitionStyle={customTransition}
                                        style={styles.cardPicture}
                                        resizeMethod={'resize'}
                                        resizeMode={'cover'}
                                        source={{uri: item.picture}} />
                                    <View style={styles.cardItem}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}
const mt = -40;
const styles = StyleSheet.create({
    card: {
        padding: 5,
        paddingBottom: 5,
        // width: '49%',
    },
    cardContainer: {
        backgroundColor: "#fff",
        padding: 5
    },
    cardItem: {
        // backgroundColor: '#CCC',
        width: '100%',
        // borderRadius: 20,
        padding: 5,
        // marginTop: mt,
    },
    // cardItemHidden: {
    //     display: 'none'
    // },
    cardTitle: {
        // width: (Dimensions.get('window').width / 2) - 30,
        textAlign: 'justify',
        paddingHorizontal: 5,
        color: '#000'
    },
    cardPicture: {
        // width: (Dimensions.get('window').width / 2) - 20,
        height: 150,
        borderRadius: 20,
    },
    cardDate: {
        fontSize: 14,
        textAlign: 'right',
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: '#fff'
    },
});
