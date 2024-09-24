import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {load} from '../../../.yarn/releases/yarn-1.22.22';


export default function ViewNewsScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: t('ViewNews'),
        });
        axios.get(`https://tgko.gasgo.pro/web/api/post/view?id=${route.params.id}`)
            .then(response => response.data)
            .then(response => {
                setPost(response);
                setError(false);
                setErrorDescription('');
            })
            .catch(error => {
                setError(true);
                setErrorDescription(t('No data found'));
            })
            .finally(() => {
                setLoading(true);
            });
        return () => {
        };
    }, []);
    return (
        <SafeAreaView>
            <ScrollView style={{padding: 10}}>
                <Text style={{color: '#000', fontSize: 21}}>{post.title}</Text>
                <Text
                    style={{color: '#000'}}>{post.body && post.body.replace(/<\/?[^>]+(>|$)/g, '').replace(/&quot;/g, '"')}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 30}}>
                    <Text
                        style={{color: '#000'}}>{(new Date(post.created_at * 1000)).toLocaleDateString()} {(new Date(post.created_at * 1000)).toLocaleTimeString()}</Text>
                    <Text style={{color: '#000'}}>{post.author}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
