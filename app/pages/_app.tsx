import type {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';
import './globals.css';
import React from 'react';
import {SessionProvider} from "next-auth/react";

function MyApp({
                   Component,
                   pageProps: {
                       session,
                       ...pageProps
                   }
               }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default appWithTranslation(MyApp);
