import {useTranslation as useI18next} from 'react-i18next';
import {useEffect, useState} from 'react';
import {LocalStorageKeysEnum} from "../enums/local-storage-keys.enum";
import {LanguagesEnum} from "../enums/languages.enum";

type Translations = {
    [key: string]: string;
}

export const useTranslation = (namespace: string) => {
    const {t: originalT, i18n} = useI18next(namespace);
    const [translations, setTranslations] = useState<Translations>({});

    useEffect(() => {
        const locale = localStorage.getItem(LocalStorageKeysEnum.INTERNATIONALIZATION_ALPHA) || LanguagesEnum.EN;

        const fetchTranslations = async (locale: string) => {
            const response = await fetch(`/api/translations?locale=${locale}&namespace=${namespace}`);
            if (!response.ok) {
                throw new Error('Failed to fetch translations');
            }
            const data = await response.json();

            setTranslations(data);
        };

        fetchTranslations(locale);
    }, []);

    const t = (key: string, options?: any): string => {
        if (translations[key]) {
            return translations[key];
        }
        return originalT(key, options) as string;
    }

    return {t, i18n, translations};
}
