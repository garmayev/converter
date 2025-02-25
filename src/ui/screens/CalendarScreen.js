import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AutoHeightWebView from "react-native-autoheight-webview";

export default function CalendarScreen({navigation}) {
    const [routes, setRoutes] = useState([]);
    const [activeRoute, setActiveRoute] = useState(undefined);
    const [activeData, setActiveData] = useState(routes.length ? routes[0] : []);

    const getDates = () => {
        axios.get(`https://tgko.ru/api/v1/events`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            let result = [];
            if (response.success) {
                for (const key in response.data.events) {
                    const item = response.data.events[key]
                    result.push({
                        key: key,
                        title: item.events_date,
                        date: item.createdon
                    })
                }
                setRoutes(result.reverse());
                setActiveRoute(result.reverse()[0]);
            } else {
                console.error(response);
            }
        }).catch(error => console.error(error));
    };
    const getEvents = (route) => {
        if (route) {
            console.log(route)
            axios.get(`https://tgko.ru/api/v1/events/${route.key}`)
                .then(response => response.data)
                .then(response => {
                    // console.log(response.data);
                    setActiveData(response.data[route.key]);
                })
                .catch(error => console.error(error));
        }
    };

    function getFullDateStr(dateStr, inclYear = true) {
        const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        let dc = dateStr.match(/(\d{1,2}).(\d{1,2}).(\d{4})/);
        if (dc) {
            dc.splice(0, 1);
            dc[0] = +dc[0];
            dc[1] = MONTHS[+dc[1] - 1];
            return inclYear ? dc.join(' ') + ' г.' : `${dc[0]} ${dc[1]}`;
        }
    }

    useEffect(() => {
        getDates();
        return () => {
        };
    }, []);

    useEffect(() => {
        getEvents(activeRoute);
    }, [activeRoute]);

    const {width, height} = Dimensions.get('window');
    const customCss = `img { display: none !important; font-size: 12px; } p { padding-right: 10px; } br { content: " "; display: block; margin-bottom: 10px; }`;

    return (
        <View style={{height: height, flex: 1, flexDirection: 'column'}}>
            <ScrollView horizontal={true} style={{backgroundColor: '#1b3f63', minWidth: width, maxHeight: 40}}>
                {routes && routes.map(route => {
                    return (
                        <Pressable key={route.key} onPress={() => {
                            setActiveRoute(route);
                        }} style={activeRoute && activeRoute.key === route.key ? styles.activeRoute : styles.route}>
                            <Text key={route.key} style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                textAlign: 'center',
                                minWidth: (routes.length < 5) ? width / routes.length : width / 4,
                            }}>{route.title}</Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
            <View style={styles.container}>
                {activeData && (
                        <Pressable key={activeData.id} onPress={() => {
                            navigation.navigate('ViewEvent', {id: activeData.id});
                        }}>
                            <View style={styles.item}>
                                <Text style={styles.header}>{activeData.events_date}</Text>
                                <Text style={{color: '#000'}}>{activeData.menutitle}</Text>
                                <AutoHeightWebView style={{width: width - 15, marginBottom: 40}} source={{html: activeData.content}} customStyle={customCss} />
                            </View>
                        </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
    },
    header: {
        color: '#000',
    },
    summary: {
        color: '#000',
    },
    activeRoute: {
        backgroundColor: '#153a50',
        borderBottomWidth: 3,
        borderBottomColor: '#fff',
    },
    route: {
        backgroundColor: '#1b3f63',
        borderBottomWidth: 3,
        borderBottomColor: '#1b3f63',
    },
});
