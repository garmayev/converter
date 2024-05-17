import {StyleSheet, Text, View} from 'react-native';
import {Header, Background, Footer} from '../components';
import React from 'react';
import globalStyles from '../core/styles';
import {theme} from '../core';

export default function AboutScreen({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation} useRightMenu={true}>AboutScreen</Header>
            <Background>
                <Text>Cool company for IT project</Text>
            </Background>
            <Footer>Created by &copy; <Text onPress={() => {navigation.navigate('AboutScreen')}}>AMGCompany</Text></Footer>
        </View>
    )
}

const styles = Object.assign(StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        color: theme.colors.text,
    },
}), globalStyles);
