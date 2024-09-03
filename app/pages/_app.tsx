import type {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';
import './globals.css';
import React from 'react';

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
