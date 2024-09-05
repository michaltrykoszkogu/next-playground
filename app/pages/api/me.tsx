import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from "next-auth";
import {authOptions} from "../../lib/auth";
import {knexClient} from "../../lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: any = await getServerSession(req, res, authOptions);

    const queryResults = await knexClient
        .select('*')
        .from('users')
        .where('email', session.user.email)
        .first();

    res.status(200).json(queryResults);
}
