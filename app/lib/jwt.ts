import crypto from "crypto"
import * as jose from "jose"
import {JWT_SECRET} from "../consts/jwt";

const DEFAULT_SIGNATURE_ALGORITHM = "HS512";
const DEFAULT_MAX_AGE = 15 * 60;

export async function encode({
                                 token = {},
                                 maxAge = DEFAULT_MAX_AGE,
                                 signingOptions = {
                                     expiresIn: `${maxAge}s`
                                 }
                             } = {}) {
    // Signing Key
    const _signingKey = await getSigningKey()

    return await new jose.SignJWT(token)
        .setProtectedHeader({
            alg: DEFAULT_SIGNATURE_ALGORITHM
        })
        .setIssuedAt()
        .setExpirationTime(signingOptions.expiresIn)
        .sign(_signingKey)
}

export async function decode({
                                 token,
                                 maxAge = DEFAULT_MAX_AGE,
                                 verificationOptions = {
                                     maxTokenAge: `${maxAge}s`,
                                     algorithms: [DEFAULT_SIGNATURE_ALGORITHM]
                                 }
                             } = {}) {
    if (!token) return null

    // Signing Key
    const _signingKey = await getSigningKey()

    // Verify token
    const {payload} = await jose.jwtVerify(token, _signingKey, {
        maxTokenAge: verificationOptions.maxTokenAge || DEFAULT_MAX_AGE,
        keyManagementAlgorithms: verificationOptions.algorithms || [
            DEFAULT_SIGNATURE_ALGORITHM
        ]
    })
    return payload
}

async function getSigningKey() {
    const buffer = crypto.hkdfSync(
        "sha256",
        JWT_SECRET,
        "",
        "HMP Generated Signing Key",
        64
    )

    return jose.importJWK(
        {
            ...crypto.createSecretKey(buffer).export({format: "jwk"}),
            alg: DEFAULT_SIGNATURE_ALGORITHM,
            use: "sig",
            kid: "hmp-generated-signing-key"
        },
        DEFAULT_SIGNATURE_ALGORITHM
    )
}
