import Container from '../components/Container';
import {Image, Text, View, StyleSheet, Linking, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

export default function AboutScreen() {
    const {t} = useTranslation();
    return (
        <View>
            <View style={{flex: 1, flexDirection: "center", alignItems: "center", marginTop: 30, minHeight: 100}}>
                <Pressable onPress={() => Linking.openURL("https://gasgo.pro")}>
                    <Image source={require("../../assets/footer-gas.png")} />
                </Pressable>
            </View>
            <View style={{padding: 20}}>
                <Text style={styles.text}>{t("CreatedGroup")}: AMG Company</Text>
                <Text style={styles.text}>{t("GeneralDirector")}: {t('Andrey Konovalov')}</Text>
                <Text style={styles.text}>{t("CommercialDirector")}: {t("Vladislav Ivanuk")}</Text>
                <Text style={styles.text}>{t("Programmer")}: {t("Bato Garmayev")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#000",
    },
    link: {
        color: "#e4e4e4"
    },
    longText: {
        flex: 1,
        flexDirection: "row",
    }
})
