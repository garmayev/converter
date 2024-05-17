import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {usernameValidator, passwordValidator} from '../helpers/validators';
import {useTranslation} from 'react-i18next';
import {theme, globalStyles} from '../core';
import Background from '../components/Background';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Session from '../components/Session';

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const {t} = useTranslation()

    const onLoginPressed = () => {
        const usernameError = usernameValidator(username.value);
        const passwordError = passwordValidator(password.value);
        if (usernameError || passwordError) {
            setUsername({...username, error: usernameError});
            setPassword({...password, error: passwordError});
            return;
        }
        fetch('https://coal.amgcompany.ru/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username: username.value, password: password.value})
        })
            .then(response => response.json())
            .then(response => {
                if ( response.ok ) {
                    Session().setItem('auth_key', response.user.auth_key).then((response) => {
                        if ( response ) {
                            global.auth_key = response.user.auth_key
                            global.profile = response.user.profile
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'DashboardScreen'}],
                            });
                        }
                    })
                } else {
                    setPassword({...password, error: response.message})
                }
            })
    };

    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation}>{t('loginScreen')}</Header>
            <Background>
                <TextInput
                    label={'Username'}
                    placeholder={'Username'}
                    returnKeyType={'next'}
                    value={username.value}
                    onChangeText={text => setUsername({value: text, error: ''})}
                    error={!!username.error}
                    errorText={username.error}
                    autoCapitalize={'none'}
                    style={styles.textInput}
                />
                {username.error !== '' && <Text style={styles.error}>{username.error}</Text>}
                <TextInput
                    label={'Password'}
                    placeholder={'Password'}
                    returnKeyType={'done'}
                    value={password.value}
                    onChangeText={text => setPassword({value: text, error: ''})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry={true}
                    style={styles.textInput}
                />
                {password.error !== '' && <Text style={styles.error}>{password.error}</Text>}
                <Pressable style={styles.button} mode={'contained'} onPress={onLoginPressed}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
            <Footer>Created by &copy; <Text onPress={() => {navigation.navigate('AboutScreen')}}>AMGCompany</Text></Footer>
        </View>
    );
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
