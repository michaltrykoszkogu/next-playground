import {NextApiRequest, NextApiResponse} from 'next';
import loadTranslationFile from "../../helpers/loadTranslationFile";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {locale, namespace} = req.query;

    if (!locale || typeof locale !== 'string' || !namespace || typeof namespace !== 'string') {
        return res.status(400).json({error: 'Missing locale or namespace parameter'});
    }

    const translations = loadTranslationFile(locale, namespace);
    if (translations) {
        res.status(200).json(translations);
    } else {
        res.status(404).json({error: 'Translations not found'});
    }
}
