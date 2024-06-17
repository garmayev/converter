import React, {useState} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View, StyleSheet, Settings} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faCog, faEllipsisVertical, faSignOut, faUser} from '@fortawesome/free-solid-svg-icons';
import MenuWrapper from './MenuWrapper';

export default function Header(props) {
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
        }, {
            key: 1,
            title: 'Settings',
            onPress: () => {
                navigation.navigate('SettingsScreen')
            },
            leadingIcon: () => {
                return <FontAwesomeIcon style={styles.flatMenuIcon} icon={faCog}/>
            },
        }
    ]

    function _renderLeftButton(navigation) {
        if ( navigation && navigation.canGoBack() ) {
            return (
                <TouchableOpacity style={styles.flatMenuButton} onPress={navigation.goBack}>
                    <Text style={styles.headerButtonText}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return (<View />)
        }
    }

    function _renderRightButton(navigation) {
        if (useRightMenu) {
            return (<MenuWrapper menu={menu} />)
        } else {
            return (<View />)
        }
    }

    return (
        <View style={styles.header}>
            {_renderLeftButton(navigation)}
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
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 21,
        paddingTop: 10,
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
        paddingHorizontal: 10,
    },
    flatMenuItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    flatMenuIcon: {
        marginTop: 5
    }
})
