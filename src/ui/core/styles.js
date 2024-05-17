import {StyleSheet} from 'react-native';
import theme from './theme';

const globalStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: '100%',
        justifyContent: 'space-between',
    },
    background: {
        width: '100%',
        backgroundColor:theme.colors.surface,
    },
    container: {
        padding: 20,
        width:'100%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    textInput: {
        width: '90%',
        borderBottomWidth: 2,
        borderColor:theme.colors.primary,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        fontSize: 14
    },
    error: {
        fontSize: 12,
        color: theme.colors.error
    },
    button: {
        backgroundColor: theme.colors.primary,
        width: '50%',
        padding: 10,
    },
    buttonText: {
        textTransform: 'uppercase',
        color: theme.colors.white,
        textAlign: 'center',
    }
})

export default globalStyles
