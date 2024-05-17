import {Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {useTranslation} from 'react-i18next';


export default function PreloaderScreen({callback}) {
    const [refreshing, setRefreshing] = useState(false)
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0))

    const {t} = useTranslation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            callback.call()
        }, 2000);
    }, []);

    const handleAnimated = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnimation, {
                    toValue: 1,
                    duration: 2400,
                    useNativeDriver: false,
                    delay: 300,
                }),
                Animated.timing(rotateAnimation, {
                    toValue: 0,
                    duration: 2400,
                    useNativeDriver: false,
                    delay: 300,
                })
            ]), {
                iterations: 100,
            }
        ).start(

        )
    }

    const interpolateAnimated = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    })

    useEffect(() => {
        handleAnimated()
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#ccc",
        },
        logo: {
            width: 120,
            height: 120,
            transform: [{
                rotate: interpolateAnimated
            }]
        },
        scrollView: {
            flex: 1,
            marginTop: -100,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} size={'large'} title={'Loading'} />
                }>
                <View style={{padding: 20, borderRadius: 95, backgroundColor: "#fff",}}>
                    <Animated.Image style={styles.logo} source={require('../../assets/logo-mini.png')} />
                </View>
                <Text>{t("Loading")} ...</Text>
            </ScrollView>
        </SafeAreaView>
    )
}
