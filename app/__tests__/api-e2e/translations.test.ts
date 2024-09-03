import handler from '../../pages/api/translations';
import mockRequestResponse from "./helpers/mockRequestResponse";
import loadTranslationFile from "../../helpers/loadTranslationFile";

describe('GET /api/translations', () => {

    it('should return 400 for missing locale or namespace', async () => {
        const {req, res} = mockRequestResponse();
        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toHaveProperty('error', 'Missing locale or namespace parameter');
    });

    it('should return translations for valid locale and namespace', async () => {
        const {req, res} = mockRequestResponse();
        req.query = {
            locale: 'en',
            namespace: 'common'
        };
        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(loadTranslationFile('en', 'common'));
    });

    it('should return 404 for non-existent locale translation file', async () => {
        const {req, res} = mockRequestResponse();
        req.query = {
            locale: 'nonExistent',
            namespace: 'common'
        };
        await handler(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toHaveProperty('error', 'Translations not found');
    });

    it('should return 404 for non-existent namespace translation file', async () => {
        const {req, res} = mockRequestResponse();
        req.query = {
            locale: 'en',
            namespace: 'nonExistent'
        };
        await handler(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toHaveProperty('error', 'Translations not found');
    });

});
