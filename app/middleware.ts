import authenticationMiddleware from "./middleware/authenticationMiddleware";

export async function middleware(req, res) {
    return await authenticationMiddleware(req, res);
}
