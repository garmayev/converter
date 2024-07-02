import {Animated, Text, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Argon, CarbonDioxide, Helium, Hydrogen, Krypton, Liquid, Methane, Neon, Nitrogen, Oxygen, Weight, Xenon,
} from './svg';
import {Balloon} from './svg/Balloon';
import Air from './svg/Air';

export default function ResultContainer({
                                            gas,
                                            value,
                                            afterDot,
                                            gasResult,
                                            liquidResult,
                                            weightResult,
                                            valueResult,
                                            logoSize,
                                            scale,
                                        }) {
    const {t} = useTranslation();
    const icon = () => {
        switch (gas.title) {
            case t('Oxygen'):
                return <Oxygen width={logoSize} height={logoSize}/>;
            case t('Argon'):
                return <Argon width={logoSize} height={logoSize}/>;
            case t('Hydrogen'):
                return <Hydrogen width={logoSize} height={logoSize}/>;
            case t('Air'):
                return <Air width={logoSize} height={logoSize} />
            case t('Helium'):
                return <Helium width={logoSize} height={logoSize}/>;
            case t('CarbonDioxide'):
                return <CarbonDioxide width={logoSize} height={logoSize}/>;
            case t('Nitrogen'):
                return <Nitrogen width={logoSize} height={logoSize}/>;
            case t('Methane'):
                return <Methane width={logoSize} height={logoSize}/>;
            case t('Xenon'):
                return <Xenon width={logoSize} height={logoSize}/>;
            case t('Krypton'):
                return <Krypton width={logoSize} height={logoSize}/>;
            case t('Neon'):
                return <Neon width={logoSize} height={logoSize}/>;
        }
    };
    const pulseAnimation = useRef(new Animated.Value(1)).current;
    const animation = () => {
    };

    useEffect(() => {
        // Animated.timing(pulseAnimation, {
        //     toValue: 1,
        //     duration: 300,
        //     useNativeDriver: true,
        // }).start();
    }, [weightResult, liquidResult, gasResult, valueResult]);
    useEffect(() => {
        // return Animated.timing(pulseAnimation, {
        //     toValue: 0,
        //     duration: 300,
        //     useNativeDriver: true,
        // }).start();
    }, []);


    return (
        <View style={styles.mainContainer}>
            {(scale.value !== 'kg' && scale.value !== 't') &&
                <Animated.View style={[styles.container, {opacity: pulseAnimation}]}>
                    <Weight width={logoSize} height={logoSize}/>
                    <Text style={styles.comment}>{t('Weight')}, {t('Kg-small')}</Text>
                    <Text style={styles.result}>{weightResult !== 0 ? weightResult.toFixed(afterDot) : '0.0'}</Text>
                </Animated.View>
            }
            {scale.value !== 'l' &&
                <Animated.View style={[styles.container, {opacity: pulseAnimation}]}>
                    <Liquid width={logoSize} height={logoSize}/>
                    <Text style={styles.comment}>{t('Liquid')}, {t('L-small')}</Text>
                    <Text style={styles.result}>{liquidResult !== 0 ? liquidResult.toFixed(afterDot) : '0.0'}</Text>
                </Animated.View>
            }
            {scale.value !== 'm3' &&
                <Animated.View style={styles.container}>
                    {icon()}
                    <Text style={styles.comment}>{t('Gas')}, {t('CubicMeter-small')}</Text>
                    <Text style={styles.result}>{gasResult.toFixed(afterDot)}</Text>
                </Animated.View>
            }
            <Animated.View style={styles.container}>
                <Balloon width={logoSize} height={logoSize}/>
                <Text style={styles.comment}>{t('Balloons')}, {t('Object')}</Text>
                <Text style={styles.result}>{valueResult.toFixed(afterDot)}</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 100,
        transform: [{rotate: '0.05rad'}],
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -90,
    },
    comment: {
        color: 'white',
        fontSize: 16,
    },
    result: {
        color: '#000',
        fontSize: 16,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
});
