import {createMocks, RequestMethod} from 'node-mocks-http';
import type {NextApiRequest, NextApiResponse} from 'next';

function mockRequestResponse(method: RequestMethod = 'GET') {
    const {
        req,
        res
    }: { req: NextApiRequest, res: NextApiResponse } = createMocks({method});

    return {req, res};
}

export default mockRequestResponse;
