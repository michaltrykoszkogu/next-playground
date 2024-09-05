import {useEffect, useState} from "react";
import {LocalStorageKeysEnum} from "../enums/local-storage-keys.enum";
import {LanguagesEnum} from "../enums/languages.enum";

export const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState<LanguagesEnum>();

    useEffect(() => {
        setCurrentLang(localStorage.getItem(LocalStorageKeysEnum.INTERNATIONALIZATION_ALPHA) as LanguagesEnum || LanguagesEnum.EN);
    }, []);

    const changeLanguage = (lang: string) => {
        const currentLanguage = localStorage.getItem(LocalStorageKeysEnum.INTERNATIONALIZATION_ALPHA);
        if (currentLanguage !== lang) {
            localStorage.setItem(LocalStorageKeysEnum.INTERNATIONALIZATION_ALPHA, lang);
            window.location.reload();
        }
    }

    return (
        <div>
            <button
                className={`bg-blue-700 ml-2 py-1 px-2 ${currentLang === LanguagesEnum.EN ? 'underline' : ''}`}
                onClick={() => changeLanguage(LanguagesEnum.EN)}
            >EN
            </button>
            <button
                className={`bg-blue-700 ml-2 py-1 px-2 ${currentLang === LanguagesEnum.DE ? 'underline' : ''}`}
                onClick={() => changeLanguage(LanguagesEnum.DE)}
            >DE
            </button>
        </div>
    )
}
