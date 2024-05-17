import React, {useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View, StyleSheet, Settings} from 'react-native';
import {globalStyles, theme} from '../core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faCog, faEllipsisVertical, faSignOut, faUser} from '@fortawesome/free-solid-svg-icons';
import {ProfileScreen, SettingsScreen} from '../screens';
import EncryptedStorage from 'react-native-encrypted-storage';
import MenuWrapper from './MenuWrapper';

export default function Header(props) {

    async function removeItem(key) {
        try {
            const session = await EncryptedStorage.removeItem(key);

            if (session !== undefined) {
                return session
            } else {
                return false
            }
        } catch (error) {
            console.error(error);
        }
    }

    function logout() {
        removeItem('auth_key').then(() => {
            global.auth_key = undefined
            navigation.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
            })
        })
    }

    const {navigation, useRightMenu} = props
    const [showMenu, setShowMenu] = useState(false);

    const menu = [
        {
            key: 0,
            title: 'Profile',
            onPress: () => {
                navigation.navigate('ProfileScreen')
            },
            leadingIcon: () => {
                return <FontAwesomeIcon style={styles.flatMenuIcon} icon={faUser} />;
            },
            background: theme.colors.surface,
        }, {
            key: 1,
            title: 'Settings',
            onPress: () => {
                navigation.navigate('SettingsScreen')
            },
            leadingIcon: () => {
                return <FontAwesomeIcon style={styles.flatMenuIcon} icon={faCog}/>
            },
            background: theme.colors.surface,
            rippleColor: theme.colors.surface,
        }, {
            key: 3,
            title: 'Logout',
            onPress: logout,
            leadingIcon: () => {
                return <FontAwesomeIcon style={styles.flatMenuIcon} icon={faSignOut}/>
            },
            background: theme.colors.white,
        }
    ]

    function onAdditionMenuPressed(e) {
        setShowMenu(!showMenu);
    }

    function _renderLeftButton(navigation) {
        if ( navigation && navigation.canGoBack() ) {
            return <TouchableOpacity style={styles.flatMenuButton} onPress={navigation.goBack}>
                <Text style={styles.headerButtonText}><FontAwesomeIcon icon={faChevronLeft}/></Text>
            </TouchableOpacity>
        } else {
            return <View />
        }
    }

    function _renderRightButton(navigation) {
        if (useRightMenu) {
            return <MenuWrapper menu={menu} />
        } else {
            return <View />
        }
    }

    return (
        <View style={styles.header}>
            {_renderLeftButton(navigation)}
            <Text style={styles.headerText} {...props} />
            {_renderRightButton(navigation)}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: theme.colors.elevation.level1,
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        elevation: 10,
    },
    headerText: {
        fontSize: 21,
        paddingTop: 10,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 0,
    },
    headerButtonText: {
        marginTop: 0,
        width: 30,
        height: 30,
        textAlign: 'center',
        padding: 6,
    },
    flatMenuButton: {
        marginTop: 10,
        width: 30,
        height: 30,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    flatMenu: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 52,
        right: 10,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 10,
    },
    flatMenuItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: theme.colors.surface
    },
    flatMenuIcon: {
        marginTop: 5
    }
})
