import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'ru',
        fallback: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: require('./translate/en.json'),
            ru: require('./translate/ru.json')
        },
    });

export default i18n;
