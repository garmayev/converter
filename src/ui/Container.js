import {StyleSheet, View} from 'react-native';
import {LogoSmall, LogoText} from './Logo';

export default function Container({children}) {
    return (
        <View style={styles.container}>
            <LogoText style={styles.headerLogo} width={"100%"} height={90} />
            {children}
            <LogoSmall style={styles.bgLogo} width={600} height={600} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E4E4E4",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 30,
    },
    headerLogo: {},
    bgLogo: {
        zIndex: 1,
        position: "fixed",
        left: 0,
        top: 0,
        opacity: .3,
        transform: [
            {rotate: "40deg"}
        ]
    }
})
