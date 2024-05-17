import {StyleSheet, Text, View} from 'react-native';
import {Background, Footer, Header} from '../components';
import {globalStyles} from '../core';
import React from 'react';

export default function SettingsScreen({navigation}) {
    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation} useRightMenu={true}>SettingsScreen</Header>
            <Background>
                <Text>Settings Screen</Text>
            </Background>
            <Footer>Created by &copy; <Text onPress={() => {navigation.navigate('AboutScreen')}}>AMGCompany</Text></Footer>
        </View>
    )
}

const styles = Object.assign(StyleSheet.create({

}), globalStyles)
