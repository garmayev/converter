import {ActivityIndicator, StyleSheet, View, Text, ScrollView, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CalendarPicker from "react-native-calendar-picker";
import {useTranslation} from "react-i18next";
import Event from "../classes/Event";

export default function CalendarScreen({navigation}) {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [eventList, setEventList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [customDateStyles, setCustomDateStyles] = useState([]);
    const today = new Date()


    const getDates = () => {
        setIsLoading(false)
        axios.get(`https://tgko.ru/api/v1/events`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            let result = [];
            const t = [];
            if (response.success) {
                for (const key in response.data.events) {
                    const event = new Event(response.data.events[key]);
                    const startDate = new Date(event.start);
                    const end = new Date(event.end);
                    if (startDate) {
                        result.push(event)
                        while (startDate <= end) {
                            const a = t.find(item => item.date === startDate && startDate >= today)
                            // console.log(a)
                            if (a === undefined) {
                                t.push({
                                    date: new Date(startDate),
                                    style: {backgroundColor: "#1E82CE"},
                                    textStyle: {color: "#fff"},
                                    containerStyle: [],
                                    allowDisabled: true
                                })
                            }
                            startDate.setDate(startDate.getDate() + 1)
                        }
                    }
                    // result.push(event)
                }
                setEventList(result)
                setCustomDateStyles( t.reverse() );
            } else {
                console.error(response);
            }
        }).catch(error => console.error(error))
            .finally(() => {
                setIsLoading(true)
            })
    };

    useEffect(() => {
        getDates();
        setSelectedDate(today)
        return () => null;
    }, []);

    useEffect(() => {
        const a = Event.filter(eventList, selectedDate);
        setFiltered([]);
        setFiltered(Event.filter(eventList, selectedDate))
    }, [selectedDate]);

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            {isLoading ?
                <>
                    <View style={{margin: 20}}>
                        <CalendarPicker style={{marginTop: 20}} onDateChange={setSelectedDate} firstDay={1}
                                        weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']} minDate={today}
                                        previousTitleStyle={{color: "#000"}} previousTitle={t("previous")}
                                        nextTitleStyle={{color: "#000"}} nextTitle={t("next")}
                                        customDatesStyles={customDateStyles}
                                        months={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}/>
                    </View>
                    {filtered ? <FlatList data={filtered} renderItem={({item}) => (
                        <View style={[styles.item, {marginHorizontal: 20}]}>
                            <Pressable onPress={() => {
                                navigation.navigate('ViewEvent', {id: item.id});
                            }}>
                                <Text style={styles.text}>{item.title}</Text>
                            </Pressable>
                        </View>
                    )}
                    /> : <View></View>}
                </> :
                <ActivityIndicator size={"large"} color={"#007BFF"}/>
            }
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
    text: {
        color: '#000'
    }
});
