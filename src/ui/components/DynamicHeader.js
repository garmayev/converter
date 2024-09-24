import {Text, Animated, Dimensions, ScrollView, StyleSheet} from 'react-native';

export default function DynamicHeader({title, description = '', animatedValue, step}) {
    const headerHeight = animatedValue.interpolate({
        inputRange: [0, step],
        outputRange: [150, 120],
        extrapolate: 'clamp',
    });
    const headerTop = animatedValue.interpolate({
        inputRange: [0, step],
        outputRange: [0, -53],
        extrapolate: 'clamp',
    });
    const headerLeft = animatedValue.interpolate({
        inputRange: [0, step],
        outputRange: [50, 50],
        extrapolate: 'clamp',
    });
    const descriptionOpacity = animatedValue.interpolate({
        inputRange: [0, step],
        outputRange: [1.0, 0.0],
        extrapolate: 'extend',
    });

    return (
            <Animated.View style={{
                position: 'absolute',

                top: headerTop,
                left: headerLeft,
                height: headerHeight,
            }}>
                <Text style={styles.title}>{title}</Text>
                {description && <Animated.View style={{
                    opacity: descriptionOpacity,
                }}>
                    <Text style={styles.description}>{description}</Text>
                </Animated.View>}
            </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 15,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    title: {
        color: '#000',
        marginTop: 50,
        paddingTop: 10,
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
