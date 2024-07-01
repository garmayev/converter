import {Animated, Text, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {BalloonLogo, EcoLogo, GasLogo} from './Logo';
import {
    Argon, CarbonDioxide, Helium, Hydrogen, Krypton, Liquid, Methane, Neon, Nitrogen, Oxygen, Weight, Xenon
} from './svg';

export default function ResultContainer({gas, value, afterDot, gasResult, liquidResult, weightResult, valueResult, logoSize, scale}) {
    const {t} = useTranslation();
    const icon = () => {
        switch (gas.title) {
            case t('Oxygen'):
                return <Oxygen width={logoSize} height={logoSize} />
            case t('Argon'):
                return <Argon width={logoSize} height={logoSize} />
            case t('Hydrogen'):
                return <Hydrogen width={logoSize} height={logoSize} />
            case t('Helium'):
                return <Helium width={logoSize} height={logoSize} />
            case t('CarbonDioxide'):
                return <CarbonDioxide width={logoSize} height={logoSize} />
            case t('Nitrogen'):
                return <Nitrogen width={logoSize} height={logoSize} />
            case t('Methane'):
                return <Methane width={logoSize} height={logoSize} />
            case t('Xenon'):
                return <Xenon width={logoSize} height={logoSize} />
            case t('Krypton'):
                return <Krypton width={logoSize} height={logoSize} />
            case t('Neon'):
                return <Neon width={logoSize} height={logoSize} />
        }
    }
    console.log(scale.value !== 'kg' && scale.value !== 't')
    return (
        <View style={styles.mainContainer}>
            {(scale.value !== 'kg' && scale.value !== 't') &&
                <Animated.View style={styles.container}>
                    <Weight width={logoSize} height={logoSize}/>
                    <Text style={styles.comment}>{t('Weight')}</Text>
                    <Text style={styles.comment}>{t('Kg-small')}</Text>
                    <Text
                        style={{paddingHorizontal: 5, ...styles.result}}>{weightResult !== 0 && weightResult.toFixed(afterDot)}</Text>
                </Animated.View>
            }
            {scale.value !== 'l' &&
                <Animated.View style={styles.container}>
                    <Liquid width={logoSize} height={logoSize}/>
                    <Text style={styles.comment}>{t('Liquid')}</Text>
                    <Text style={styles.comment}>{t('L-small')}</Text>
                    <Text
                        style={{paddingHorizontal: 5, ...styles.result}}>{liquidResult !== 0 && liquidResult.toFixed(afterDot)}</Text>
                </Animated.View>
            }
            {scale.value !== 'm3' &&
                <Animated.View style={styles.container}>
                    {icon()}
                    <Text style={styles.comment}>{t('Gas')}</Text>
                    <Text style={styles.comment}>{t('CubicMeter-small')}</Text>
                    <Text style={{paddingHorizontal: 5, ...styles.result}}>{gasResult.toFixed(afterDot)}</Text>
                </Animated.View>
            }
            <Animated.View style={styles.container}>
                <BalloonLogo width={logoSize} height={logoSize}/>
                <Text style={styles.comment}>{t('Balloons')}</Text>
                <Text style={styles.comment}>{t('Object')}</Text>
                <Text style={{paddingHorizontal: 5, ...styles.result}}>{valueResult !== 0 ? valueResult.toFixed(afterDot) : "0.0"}</Text>
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
        fontSize: 18,
    },
    result: {
        color: '#000',
        fontSize: 20,
        paddingTop: 10,
    }
});
