import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../core';
import {Background, Footer, Header} from '../components';
import {Card} from '@rneui/themed';

export default function ViewScreen({route, navigation}) {
    const { orderId } = route.params;
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`https://coal.amgcompany.ru/api/order/view?id=${orderId}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${global.auth_key}`,
            },
        })
            .then(response => response.json())
            .then(result => {
                setOrder(result.data)
                console.log(order);
            })
    }, []);

    if (order) {
        let date = new Date(Number(order.delivery_at) * 1000).toLocaleDateString('ru-RU')
        let time = new Date(Number(order.delivery_at) * 1000).toLocaleTimeString('ru-RU', {timeStyle: 'short', timeZone: 'Asia/Irkutsk'})
        return (
            <View style={styles.mainContainer}>
                <Header navigation={navigation} useRightMenu={true}>View Screen</Header>
                <Background>
                    <Card>
                        <Card.Title title={'Delivery Info'}>Delivery Info</Card.Title>
                        <Card.Divider/>
                        <Text>Location: {order.location && order.location.title}</Text>
                        <View style={{borderWidth: 1, borderColor: 'light-gray', minHeight: 190}}></View>
                        <Text>Delivery Date: {date} {time}</Text>
                    </Card>
                    <Card>
                        <Card.Title title={'Delivery Info'}>Client Info</Card.Title>
                        <Card.Divider/>
                        <Text>Name: {order.client && order.client.name}</Text>
                        <Text>Phone: {order.client && order.client.phone}</Text>
                        <Text>Email: {order.client && order.client.email}</Text>
                        <Text>Company: {order.client && order.client.company && order.client.company.title}</Text>
                    </Card>
                    <Card>
                        <Card.Title title={'Delivery Info'}>Order Info</Card.Title>
                        <Card.Divider/>
                        {order.products && order.products.map((item) => {
                            return (<View>
                                <Text>Category: {item.product.group_title}</Text>
                                <Text>Product: {item.product.title}</Text>
                                <Text>Purity: {item.product.purity}</Text>
                                <Text>Count: {item.count}</Text>
                            </View>)
                        })}
                    </Card>
                </Background>
                <Footer>Created by &copy; <Text onPress={() => {
                    navigation.navigate('AboutScreen');
                }}>AMGCompany</Text></Footer>
            </View>
        );
    }
}

const styles = Object.assign(StyleSheet.create({}), globalStyles)
