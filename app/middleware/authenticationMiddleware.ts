import {NextRequest, NextResponse} from "next/server";
import {jwtDecode} from "jwt-decode"

const throwAuthError = (issue: string, code: number = 401) => {
    console.log('authenticationMiddleware issue: ', issue, ', code:', code);
}

const handleAuthHeader = async (authHeader: string) => {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
        return throwAuthError('Invalid authorization header type');
    }

    await fetch('https://localhost:3000/api/auth/validate-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return throwAuthError('Invalid authorization header');
        })
        .then(({isValid, error}) => {
            if (!isValid) {
                return throwAuthError(error);
            }

            return NextResponse.next();
        })
        .catch(error => {
            return throwAuthError('Invalid authorization header');
        });
}

const handleSessionToken = async (sessionToken: string) => {
    let decodedToken;
    try {
        decodedToken = jwtDecode(sessionToken);
    } catch (e) {
        return throwAuthError('Invalid session token');
    }

    // here's where you would validate the session token - check for email, password etc.

    return NextResponse.next();
}

export default async function handler(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');

    if (authHeader) {
        return handleAuthHeader(authHeader);
    }

    const sessionToken = (
        req.cookies.get('next-auth.session-token') ||
        req.cookies.get('__Secure-next-auth.session-token')
    )?.value;

    if (sessionToken) {
        return handleSessionToken(sessionToken);
    }

    return throwAuthError('No authorization header or session cookie found');
}
