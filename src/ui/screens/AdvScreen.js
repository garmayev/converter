import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView, Pressable, FlatList, ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendarAlt, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {response} from "../../../.yarn/releases/yarn-1.22.22";

export default function AdvScreen({navigation}) {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    const request = () => {
        axios({
            url: "https://tgko.ru/api/v1/adverts",
            method: 'get',
            timeout: 999999,
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                const result = [];
                if (response.data.success) {
                    for (const key in response.data.data.adverts) {
                        result.push(response.data.data.adverts[key])
                    }
                    setLoading(false)
                    setData(result.reverse())
                }
            })
            .catch(error => console.error(error))
    };

    useEffect(() => {
        navigation.setOptions({
            title: t('Advertisements'),
        });
        setLoading(true)
        axios.get("https://tgko.ru/api/v1/adverts/categories", {
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.data)
            .then(response => {
                const result = [];
                if (response.success) {
                    for (const key in response.data.categories) {
                        result.push(response.data.categories[key])
                    }
                }
                setCategories(result)
                setCategory(result[0])
            })
        return () => {
        };
    }, []);
    useEffect(() => {
        setLoading(true)
        axios({
            url: "https://tgko.ru/api/v1/adverts",
            method: "get",
            params: {
                category_id: category?.id,
            }
        })
            .then(response => response.data)
            .then(response => {
                const result = [];
                if (response.success) {
                    for (const key in response.data.adverts) {
                        const item = response.data.adverts[key]
                        if (!item.isDisactual) {
                            result.push(item);
                        }
                    }
                    result.sort((a, b) => {
                        if (a.tv_advert_date_unix < b.tv_advert_date_unix) {
                            return 1;
                        }
                        if (a.tv_advert_date_unix > b.tv_advert_date_unix) {
                            return -1;
                        }
                        return (a.id > b.id) ? -1 : 1;
                    })
                    // console.log(result[1])
                    setData(result)
                }
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
        console.log(new Date(1742364013000).toLocaleDateString())
    }, [category]);

    const Item = ({item}) => {
        return (
            <Pressable onPress={() => {
                if (!item.isDisactual) {
                    navigation.navigate('ViewAdv', {id: item.id});
                }
            }}>
                <View style={item.isDisactual ? styles.cardDisActual : styles.cardActual}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingVertical: 5}}>
                        <Text style={{
                            backgroundColor: "#66C8AB",
                            paddingVertical: 3,
                            paddingHorizontal: 8,
                            marginHorizontal: 5,
                            borderRadius: 3,
                            color: "#FFF"
                        }}>{category?.title}</Text>
                        <Text style={{color: "#000", fontStyle: "italic", fontSize: 12}}>
                            <FontAwesomeIcon icon={faCalendarAlt} size={10} />
                            {(new Date(item.tv_advert_date_unix * 1000)).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={{marginHorizontal: 5}}>
                        <Text style={[styles.cardText, {fontWeight: "700", textAlign: "left"}]}>{item.title}</Text>
                    </View>
                    <Text style={{color: "#000"}}>{item.tv_advert_name}</Text>
                </View>
            </Pressable>
        )
    }
    const DropdownButton = (item) => (
        <View style={styles.dropdownButtonStyle}>
            <View style={styles.dropdownPlaceholderStyle}>
                <Text style={styles.dropdownPlaceholderStyle}>{item?.title}</Text>
                <FontAwesomeIcon icon={faChevronDown}
                                 style={styles.dropdownItemIconStyle}/>
            </View>
        </View>
    )
    const DropdownItem = (item, index, isSelected) => (
        <View
            style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
    )

    return (
        <SafeAreaView>
            {!loading ?
                <>
                    <View style={{margin: 10}}>
                        <SelectDropdown
                            defaultValue={category}
                            onSelect={(selectedItem) => {
                                setCategory(selectedItem);
                            }}
                            renderButton={DropdownButton}
                            renderItem={DropdownItem}
                            data={categories}/>
                    </View>
                    <FlatList data={data} renderItem={Item} contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 80,
                    }} keyExtractor={(item) => `adv-${item.id}`}/>
                </> :
                <ActivityIndicator size={"large"} color={"#007BFF"} styles={{marginVertical: 20, paddingVertical: 20}}/>
            }
        </SafeAreaView>
    );
}

const shadow = {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 7
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4E4E4',
        paddingVertical: 15,
        paddingBottom: 50,
    },
    card: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        minHeight: 90,
        borderRadius: 5,
        ...shadow
    },
    cardDisActual: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#CCC',
        minHeight: 90,
        borderRadius: 5,
        ...shadow
    },
    cardActual: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        ...shadow
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

    dropdownButtonStyle: {
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        color: '#000',
    },
    dropdownPlaceholderStyle: {
        flex: 1,
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 5,
    },
    dropdownPlaceholderTextStyle: {
        marginLeft: 5,
        color: '#000',
    },
    dropdownButtonIconStyle: {
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    dropdownSearchInputStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        marginRight: 5,
    },
});
