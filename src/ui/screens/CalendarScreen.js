import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl} from '../../const';

export default function CalendarScreen({navigation}) {
    const [routes, setRoutes] = useState([]);
    const [activeRoute, setActiveRoute] = useState(undefined);
    const [activeData, setActiveData] = useState(routes.length ? routes[0] : []);

    const getDates = () => {
        axios.get(`${baseUrl}/event/date`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            let result = [];
            if (response) {
                response.map((item, index) => {
                    result.push({
                        key: index,
                        title: getFullDateStr((new Date(item.date)).toLocaleDateString(), false),
                        date: item.date,
                    });
                });
                setRoutes(result);
                setActiveRoute(result[0]);
            } else {
                console.error(response);
            }
        }).catch(error => console.error(error));
    };
    const getEvents = (route) => {
        if (route) {
            let activeRouteDate = new Date(route.date);
            axios.get(`${baseUrl}/event/search-by-date?date=${activeRouteDate.getTime() / 1000}`)
                .then(response => response.data)
                .then(response => {
                    // console.log(response);
                    setActiveData(response);
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
                                textAlign: 'center',
                                minWidth: (routes.length < 5) ? width / routes.length : width / 4,
                            }}>{route.title}</Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
            <View style={styles.container}>
                {activeData && activeData.map((item, index) => {
                    return (
                        <Pressable key={index} onPress={() => {
                            navigation.navigate('ViewEvent', {id: item.id});
                        }}>
                            <View style={styles.item}>
                                <Text style={styles.header}>{getFullDateStr((new Date(item.date * 1000)).toLocaleDateString())}</Text>
                                <Text style={{color: '#000'}}>{item.title}</Text>
                            </View>
                        </Pressable>
                    );
                })}
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
