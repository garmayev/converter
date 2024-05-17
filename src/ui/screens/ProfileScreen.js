import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Background, Footer, Header} from '../components';
import {globalStyles} from '../core';

export default function ProfileScreen({navigation}) {
    console.log(global.orders);
    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation} useRightMenu={true}>ProfileScreen</Header>
            <Background>
                <Text>Profile Screen</Text>
            </Background>
            <Footer>Created by &copy; <Text onPress={() => {navigation.navigate('AboutScreen')}}>AMGCompany</Text></Footer>
        </View>
    )
}

const styles = Object.assign(StyleSheet.create({

}), globalStyles)
