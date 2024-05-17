import {StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import {Footer, Header} from '../components';
import React, {useEffect, useState} from 'react';
import {theme, globalStyles} from '../core';
import MenuWrapper from '../components/MenuWrapper';
import {Paragraph} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import PreloaderScreen from './PreloaderScreen';

export default function DashboardScreen({navigation}) {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState(null);
    const {t} = useTranslation()
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${global.auth_key}`,
        },
    };

    useEffect(() => {
        fetch('https://coal.amgcompany.ru/api/product/index', options)
            .then(response => response.json())
            .then(products => {
                if (products.status) {
                    global.products = products.data
                    setProducts(products.data)
                    return fetch('https://coal.amgcompany.ru/api/order/index', options).then(response=>response.json())
                }
            })
            .then(orders => {
                if (orders.status) {
                    global.orders = orders.data
                    setOrders(orders.data)
                }
            })
    }, []);
    const removeOrder = (order) => {
        fetch(`https://coal.amgcompany.ru/api/order/delete?id=${order.id}`, Object.assign(options, {method: "DELETE"}))
            .then(response => {
                return response.json();
            })
            .then(response => {
                order.visible = false
            })
            .catch(error => console.error(error))
    }

    if ( orders ) {
        console.log(orders);
        return (
            <View style={styles.mainContainer}>
                <Header navigation={navigation} useRightMenu={true}>{t('dashboardScreen')}</Header>
                <Background>
                    {orders.map((order) => {
                        let date = new Date(Number(order.delivery_at) * 1000).toLocaleDateString('ru-RU')
                        let time = new Date(Number(order.delivery_at) * 1000).toLocaleTimeString('ru-RU', {timeStyle: 'short', timeZone: 'Asia/Irkutsk'})
                        if (order.visible) {
                            return (
                                <View id={`order_${order.id}`} key={order.id} style={[styles.horizontal, styles.order]}>
                                    <View style={[styles.vertical, styles.w75]}>
                                        <Text style={styles.orderTitle} onPress={() => {
                                            navigation.navigate('ViewScreen', {orderId: order.id});
                                        }}>Order #{order.id} ({order.status_text})</Text>
                                        <Text>{date} {time}</Text>
                                    </View>
                                    <View style={[styles.middle, styles.w25]}>
                                        <Text>{order.total_price}</Text>
                                    </View>

                                    <MenuWrapper navigation={navigation} menu={[
                                        {
                                            id: order.id,
                                            title: 'View',
                                            onPress: () => {
                                                navigation.navigate('ViewScreen', {
                                                    orderId: order.id,
                                                });
                                            },
                                        }, {
                                            id: order.id,
                                            title: 'Delete',
                                            onPress: () => {
                                                removeOrder(order);
                                            },
                                        },
                                    ]}/>
                                </View>
                            );
                        }
                    })}
                </Background>
                <Footer>Created by &copy; <Text onPress={() => {
                    navigation.navigate('AboutScreen');

                }}>AMGCompany</Text></Footer>
            </View>
        );
    } else {
        return (
            <View style={styles.view}>
                <PreloaderScreen callback={() => {setOrders([])}} />
            </View>
        )
    }
}

const styles = Object.assign(StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        color: theme.colors.text,
    },
    order: {
        marginVertical: 5,
        backgroundColor: theme.colors.surface,
        borderRadius: 5,
        elevation: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minHeight: 80
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    horizontal: {
        flexDirection: 'row',
    },
    vertical: {
        flexDirection: 'column'
    },
    w75: {
        width: '75%'
    },
    w25: {
        width: '25%',
        textAlign: 'right'
    },
    middle: {
        flex: 1,
        height: '100%',
    }
}), globalStyles);
