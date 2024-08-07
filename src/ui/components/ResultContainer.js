import {Animated, Text, View, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Argon, CarbonDioxide, Helium, Hydrogen, Krypton, Liquid, Methane, Neon, Nitrogen, Oxygen, Weight, Xenon,
} from '../icons';
import {Balloon} from '../icons/Balloon';
import Air from '../icons/Air';
import Blank from '../icons/Blank';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

function ResultItem({
                        result, icon, afterDot, comment,
                    }) {
    const [text, _setText] = useState(0.0);
    const setText = (value) => {
        Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
        }).start(() => {
            _setText(value);
            Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }).start();
        });
    };
    const opacityAnimation = useRef(new Animated.Value(0)).current;
    const duration = 300;
    const opacityStyle = {opacity: opacityAnimation};

    useEffect(() => {
        setText(result);
    }, [result]);

    return (
        <Animated.View style={[opacityStyle, styles.container]}>
            {icon}
            <Text style={styles.comment}>{`${comment}`}</Text>
            <Text style={styles.result}>{text.toFixed(afterDot)}</Text>
        </Animated.View>
    );
}

export default function ResultContainer({
                                            selectedGas,
                                            result,
                                            logoSize,
                                            scale,
                                            error,
                                        }) {
    const {t} = useTranslation();
    const icon = () => {
        if (selectedGas) {
            switch (selectedGas.title) {
                case t('Oxygen'):
                    return <Oxygen width={logoSize} height={logoSize}/>;
                case t('Argon'):
                    return <Argon width={logoSize} height={logoSize}/>;
                case t('Hydrogen'):
                    return <Hydrogen width={logoSize} height={logoSize}/>;
                case t('Air'):
                    return <Air width={logoSize} height={logoSize}/>;
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
                default:
                    return <Blank width={logoSize} height={logoSize}/>;
            }
        } else {
            return <Blank width={logoSize} height={logoSize}/>;
        }
    };

    return (
        <>
            <View style={{...styles.mainContainer, ...styles.shadow}}>
                {(scale.value !== 'kg' && scale.value !== 't') &&
                    <ResultItem icon={<Weight width={logoSize} height={logoSize} style={styles.shadow}/>}
                                result={result.weight} afterDot={2} comment={`${t('Weight')}, ${t('Kg-small')}`}/>
                }
                {scale.value !== 'l' &&
                    <ResultItem icon={<Liquid width={logoSize} height={logoSize} style={styles.shadow}/>}
                                result={result.liquid} afterDot={2} comment={`${t('Liquid')}, ${t('L-small')}`}/>
                }
                {scale.value !== 'm3' &&
                    <ResultItem icon={icon()} result={result.gas} afterDot={2}
                                comment={`${t('Gas')}, ${t('CubicMeter-small')}`}/>
                }
                <ResultItem icon={<Balloon width={logoSize} height={logoSize} style={styles.shadow}/>}
                            result={result.count}
                            afterDot={3} comment={`${t('Balloons')}, ${t('Object')}`}/>
            </View>
            <View>
                {result.count === 0.0 && error &&
                    <Text style={styles.error}>{t('System Fail! Not enough data!')}</Text>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#FFF',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .5,
                shadowRadius: 5,
            },
            android: {
                shadowColor: '#FFF',
                elevation: 20,
            },
        }),
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 100,
        transform: [{rotate: '0.05rad'}],
        elevation: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -90,
    },
    comment: {
        color: '#fff',
        fontSize: 16,
    },
    result: {
        color: '#000',
        fontSize: 16,
        paddingTop: 10,
        paddingHorizontal: 5,
        shadowColor: '#fff',
        elevation: 20,
    },
    error: {
        marginTop: 10,
        color: 'red',
        fontWeight: '700',
        textAlign: 'center',
    },
});
