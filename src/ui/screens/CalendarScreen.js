import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {baseUrl} from '../../const';
import {useTranslation} from 'react-i18next';

export default function CalendarScreen({navigation}) {
    const [date, _setDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [customEvent, setCustomEvent] = useState([]);
    const {t} = useTranslation();

    const setDate = (newDate) => {
        _setDate(newDate);
        let url = `${baseUrl}/event/search-by-date?date=${newDate.getTime() / 1000}`;
        // console.log(`${baseUrl}/event/view?date=${newDate.getTime() / 1000}`);
        axios.get(url)
            .then(response => response.data)
            .then(response => {
                setCustomEvent(response);
                console.log(response);
                return response;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const request = () => {
        axios.get(`${baseUrl}/event/index`, {
            header: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).then(response => {
            let result = response.map(item => {
                return {
                    ...item,
                    date: new Date(item.date * 1000),
                    marked: true,
                    selected: true,
                };
            });
            setEvents(result);
            return result;
        }).catch(error => {
            console.error(error);
        });
    };
    const view = (id) => {
        navigation.navigate('ViewEvent', {id: id});
        // request(id)
        // console.log(id);
    };

    useEffect(() => {
        navigation.setOptions({
            title: t('Calendar'),
        });
        request();
        const intervalId = setInterval(() => {
            console.log("Test");
            request();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View>
            <CalendarPicker
                onDateChange={setDate}
                startFromMonday={true}
                scaleFactor={375}
                minDate={new Date()}
                weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                months={[
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                ]}
                customDatesStyles={events}
                todayBackgroundColor={'transparent'}
                previousTitle={<FontAwesomeIcon icon={faChevronLeft}/>}
                nextTitle={<FontAwesomeIcon icon={faChevronRight}/>}
            />
            {(customEvent.length > 0) && customEvent.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => {
                        view(item.id);
                    }} key={index}>
                        <EventView item={item} index={index}/>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function EventView(item, index) {
    const {t} = useTranslation();

    return (
        <View style={styles.eventContainer}>
            <Text><Text style={styles.header}>{t('Event')}: </Text><Text style={styles.text}>{item.item.title}</Text></Text>
            <Text><Text style={styles.header}>{t('Description')}: </Text><Text
                style={styles.text}>{item.item.description}</Text></Text>
            <Text><Text style={styles.header}>{t('Date')}: </Text><Text
                style={styles.text}>{new Date(item.item.date * 1000).toLocaleString()}</Text></Text>
            <Text style={styles.submit}>{t('View more')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    eventContainer: {
        color: '#000',
        paddingVertical: 15,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        marginHorizontal: 15,
    },
    header: {
        fontWeight: 'bold',
        color: '#000',
    },
    text: {
        color: '#000',
    },
    submit: {
        color: '#000',
        backgroundColor: '#ccc',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 5,
        marginVertical: 5,
    },
});
