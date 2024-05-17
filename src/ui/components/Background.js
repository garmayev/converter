import React from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {theme} from '../core';

export default function Background({ children }) {
    return(
        <ScrollView style={styles.background} >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={"padding"}
            >{children}</KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.white,
    }
})
