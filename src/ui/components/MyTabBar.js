import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

export default function MyTabBar({state, descriptors, navigation}) {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.touchable}
                        key={index}
                    >
                        {options.tabBarIcon.call(this, navigation)}
                        <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        height: 60,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        left: 10,
        right: 10,
        elevation: 10
    },
    touchable: {
        flex: 1,
        alignItems: 'center'
    }
})
