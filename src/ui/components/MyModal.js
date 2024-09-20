import {Pressable, Text, View, StyleSheet, Modal} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';


export default function MyModal({visible, animationType, requestClose, title, children}) {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible]);

    return (
        <Modal animationType={animationType ?? 'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {
            setModalVisible(false)
            requestClose()
        }} presentationStyle={'overFullScreen'}>
            <Pressable onPress={() => {
                setModalVisible(false)
                requestClose()
            }} style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable onPress={() => {
                        setModalVisible(false)
                        requestClose()
                    }} style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTitle}>{title}</Text>
                        <FontAwesomeIcon icon={faTimes} size={28} style={styles.modalHeaderClose} />
                    </Pressable>
                    {children}
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .3)',
    },
    modalView: {
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        width: '90%',
        position: 'relative',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        width: '100%',
        position: 'relative',
        paddingBottom: 15,
        elevation: 5,
    },
    modalHeaderTitle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 28
    },
    modalHeaderClose: {
        position: 'absolute',
        top: 8,
        right: 0,
    },
    text: {
        color: '#000'
    },
})
