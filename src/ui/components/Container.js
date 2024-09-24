import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Linking, Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {Logo} from '../icons/Logo';
import React from 'react';

export default function Container({children, image}) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.bgHeader} source={image}/>
                <Logo style={styles.headerLogo} />
            </View>
            <ScrollView style={{paddingVertical: 5}}>
                {children}
            </ScrollView>
            <Image style={styles.bgLogo} source={require('../../assets/logo-mini.png')} resizeMode={'stretch'}
                   resizeMethod={'resize'} height={600} width={600} blurRadius={2}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4E4E4',
        flex: 1,
        flexDirection: 'column',
        minHeight: Dimensions.get('window').height,
        minWidth: Dimensions.get('window').width,
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 1.5,
    },
    headerLogo: {
        position: 'absolute',
        zIndex: 2,
        minHeight: 50,
        minWidth: 100,
        top: Platform.OS === "ios" ? 40 : 0,
        right: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        left: 0,
        right: 0,
        bottom: 10,
        position: 'absolute',
        marginBottom: 20,
    },
    bgHeader: {
        width: '100%',
        height: Dimensions.get('window').width / 1.47,
        top: -2,
        resizeMode: 'contain',
    },
    bgLogo: {
        zIndex: -1,
        position: 'absolute',
        width: 600,
        height: 600,
        resizeMode: 'cover',
        right: -250,
        top: Dimensions.get('screen').height - 450,
        opacity: .5,
        transform: [
            {rotate: '40deg'},
        ],
    },
    corporateLogo: {
        position: 'absolute',
        bottom: 0,
    },
});
