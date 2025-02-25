import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import AutoHeightWebView from "react-native-autoheight-webview";

const shadow = {
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    elevation: 7,
};

export default function ViewNewsScreen({route, navigation}) {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const {t} = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            title: t('ViewNews'),
        });
        setLoading(false)
        console.log("Request is started")
        axios({
            url: `https://tgko.ru/api/v1/news/get/${route.params.id}`,
            method: 'get',
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setPost(response.data.data[route.params.id])
                setLoading(true)
                console.log("Request is done")
                console.log(response.data.data[route.params.id])
            })
            .catch((error) => {
                console.log("Request is failed")
            })
            .finally(() => {
                console.log("Request is complete")
            })
        return () => {
        };
    }, []);
    const {width, height} = Dimensions.get("window");
    const marginBottom = 40;
    const customCss = `img { display: none !important; font-size: 12px; } p { padding-right: 10px; } br { content: " "; display: block; margin-bottom: 10px; }`;

    return (
        <SafeAreaView>
            {loading ?
                <ScrollView style={{padding: 10}}>
                    <View style={[shadow, {height: 250, marginHorizontal: 5, marginVertical: 20, borderRadius: 10}]}>
                        <Image style={{height: 250, borderRadius: 8}} resizeMode={'cover'}
                               source={{uri: `https://tgko.ru/${post.news_image}`}}/>
                    </View>
                    <Text style={{color: '#000', fontSize: 24, marginBottom: marginBottom}}>{post.menutitle}</Text>
                    <AutoHeightWebView style={{width: width - 15, marginBottom: marginBottom}} source={{html: post.content}} customStyle={customCss} />
                    <View style={{marginBottom: marginBottom}}>
                        <Text style={{color: '#000', fontStyle: "italic"}}>{(new Date(post.createdon * 1000)).toLocaleDateString()}</Text>
                        <Text style={{color: '#000', fontStyle: "italic"}}>{post.news_source_title}</Text>
                    </View>
                </ScrollView> :
                <ActivityIndicator size={"large"} color={"#007BFF"} />
            }
        </SafeAreaView>
    );
}

