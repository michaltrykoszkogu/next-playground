import Link from "next/link";
import {LanguageSwitcher} from "../components/LanguageSwitcher";
import {useTranslation} from "../hooks/useTranslation";
import {useCurrentPage} from "../hooks/useCurrentPage";
import {useSession} from "next-auth/react";

type MenuItem = {
    key: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {key: "home", href: "/"},
    {key: "about", href: "/about"},
    {key: "Login", href: "/api/auth/signin"},
];

export const Header = () => {
    const {t} = useTranslation("common");
    const currentPage = useCurrentPage();
    const {data: session} = useSession();

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl">My App</h1>
            <nav>
                <ul className="flex space-x-4">
                    {menuItems && menuItems.map((item) => (
                        <li key={item.key}>
                            <Link href={item.href}>
                                <p className={currentPage === item.href ? 'underline' : ''}>{t(item.key)}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {session && (
                <p>Logged in: {session?.user?.email}</p>
            )}
            <p></p>
            <LanguageSwitcher/>
        </header>
    )
}
