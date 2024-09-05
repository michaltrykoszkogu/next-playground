import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from "next-auth";
import {authOptions} from "../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    res.status(200).json({
        session
    });
}
