import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../core';

export default function Footer(props) {
    return (<View style={styles.footer}><Text style={styles.footerText} {...props}></Text></View>)
}

const styles = StyleSheet.create({
    footer: {
        paddingVertical: 10,
        backgroundColor: theme.colors.elevation.level1,
        borderTopColor: theme.colors.primary,
        borderTopWidth: 1,
        elevation: 10,
        height: 40,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
    }
})
