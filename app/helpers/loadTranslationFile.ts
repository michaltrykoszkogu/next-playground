import path from "path";
import fs from "fs";

const loadTranslationFile = (locale: string, namespace: string) => {
    const filePath = path.resolve(process.cwd(), `public/locales/${locale}/${namespace}.json`);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } else {
        return null;
    }
};

export default loadTranslationFile;
