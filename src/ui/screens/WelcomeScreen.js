import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import Container from '../components/Container';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faCalendar,
    faCalendarAlt, faCalendarDay,
    faCircleUp, faGlobe,
    faRightLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function WelcomeScreen({navigation}) {
    const image = require('../../assets/bg-car3.jpg');
    const {t} = useTranslation();
    return (
        <Container image={image} useBg={false}>
            <View style={styles.container}>
                <Pressable style={styles.btn} onPress={() => {
                    navigation.navigate('ConverterScreen')
                }}>
                    <View style={styles.btnView}>
                        <FontAwesomeIcon icon={faRightLeft} size={stylesConfig.iconSize} />
                        <Text style={styles.text}>{t('Converter')}</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => {
                    navigation.navigate('ValueScreen')
                }}>
                    <View style={styles.btnView}>
                        <FontAwesomeIcon icon={faCircleUp} size={stylesConfig.iconSize} />
                        <Text style={styles.text}>{t('ValueInBalloon')}</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => {
                    navigation.navigate('NewsScreen')
                }}>
                    <View style={styles.btnView}>
                        <FontAwesomeIcon icon={faGlobe} size={stylesConfig.iconSize} />
                        <Text style={styles.text}>{t('News')}</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => {
                    navigation.navigate('CalendarScreen')
                }}>
                    <View style={styles.btnView}>
                        <FontAwesomeIcon icon={faCalendarDay} size={stylesConfig.iconSize} />
                        <Text style={styles.text}>{t('Calendar')}</Text>
                    </View>
                </Pressable>
            </View>
        </Container>
    );
}
const stylesConfig = {
    margin: 8,
    height: 100,
    iconSize: 30,
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btn: {
        width: Dimensions.get('window').width / 2 - stylesConfig.margin * 2,
        margin: stylesConfig.margin,
        borderRadius: stylesConfig.margin,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#fff',
        elevation: stylesConfig.margin,
        height: stylesConfig.height
    },
    btnView: {
        height: stylesConfig.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000'
    }
})
