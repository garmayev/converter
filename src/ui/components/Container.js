import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {LogoText} from './Logo';

export default function Container({children}) {
    return (
        <View style={styles.container}>
            <LogoText style={styles.headerLogo}/>
            {children}
            <Image style={styles.bgLogo} source={require('../../assets/logo-mini.png')} resizeMode={'stretch'}
                   resizeMethod={'resize'} height={600} width={600} blurRadius={3}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4E4E4',
        flex: 1,
        flexDirection: 'column',
        minHeight: '100%',
        justifyContent: 'flex-start',
    },
    headerLogo: {
        minHeight: 100,
        minWidth: '100%',
        marginVertical: 10,
    },
    bgLogo: {
        zIndex: -1,
        position: 'absolute',
        width: 600,
        height: 600,
        resizeMode: 'cover',
        right: -250,
        top: Dimensions.get("screen").height - 450,
        opacity: .5,
        transform: [
            {rotate: '40deg'},
        ],
    },
});
