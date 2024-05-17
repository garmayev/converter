import Background from '../components/Background';
import Header from '../components/Header';
import React, {useState} from 'react';
import {usernameValidator, emailValidator, passwordValidator} from '../helpers/validators';
import {TextInput, StyleSheet, Button, View, Text, Pressable} from 'react-native';
import {theme, globalStyles} from '../core';
import {Footer} from '../components';

export default function RegisterScreen({navigation}) {
    const [username, setUsername] = useState({value: '', error: ''});
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});

    const onSignUpPressed = () => {
        const usernameError = usernameValidator(username.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError || usernameError) {
            setUsername({...username, error: usernameError})
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }
        navigation.navigate("LoginScreen")
    }

    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation} useRightMenu={false}>RegisterScreen</Header>
            <Background>
                <TextInput
                    label={"Username"}
                    placeholder={"Username"}
                    returnKeyType={"next"}
                    value={username.value}
                    onChangeText={(text) => setUsername({value: text, error: ""})}
                    error={!!username.error}
                    errorText={username.error}
                    autoCapitalize={"none"}
                    style={styles.textInput}
                />
                {username.error !== '' && <Text style={styles.error}>{username.error}</Text>}
                <TextInput
                    label={"Email"}
                    placeholder={"Email"}
                    returnKeyType={"next"}
                    value={email.value}
                    onChangeText={(text) => setEmail({value: text, error: ""})}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize={"none"}
                    style={styles.textInput}
                />
                {email.error !== '' && <Text style={styles.error}>{email.error}</Text>}
                <TextInput
                    label={"Password"}
                    placeholder={"Password"}
                    returnKeyType={"done"}
                    value={password.value}
                    onChangeText={(text) => setPassword({value: text, error: ""})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry={true}
                    style={styles.textInput}
                />
                {password.error !== '' && <Text style={styles.error}>{password.error}</Text>}
                <Pressable style={styles.button} onPress={onSignUpPressed}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
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
