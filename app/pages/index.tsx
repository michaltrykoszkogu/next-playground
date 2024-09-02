import {useTranslation} from "next-i18next";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

export default function Home() {
    const {t} = useTranslation("common");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {t("hello")}
                </p>
            </div>
        </main>
    )
}

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}
