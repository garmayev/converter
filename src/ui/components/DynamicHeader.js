import {Text, Animated, Dimensions, ScrollView, StyleSheet} from 'react-native';

export default function DynamicHeader({title, description = '', animatedValue, step, start = true}) {
    return (
            <Animated.View style={{
                left: 50,
                height: 50
            }}>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF',
        // padding: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    title: {
        color: '#000',
        paddingTop: 5,
        fontSize: 27,
        fontFamily: 'Jura-Light',
        letterSpacing: 1,
    },
    description: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Jura-Light'
    },
})
