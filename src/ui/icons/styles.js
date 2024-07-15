import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    fil1: {
        fill: '#85B6FF',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
    },
    fil0: {
        fill: '#FFF',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 15
    },
    str0: {
        stroke: 'black',
        strokeWidth:8.82,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit:22.9256
    },
    shadow: {
        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .75,
        shadowRadius: 7,
    },
});
