import { magic } from '../../modules/auth/magic'
import { removeTokenCookie } from '../../modules/auth/cookies'
import { getLoginSession } from '../../modules/auth'

export default async function logout(req, res) {
    try {
        const session = await getLoginSession(req)

        if (session) {
            await magic.users.logoutByIssuer(session.issuer)
            removeTokenCookie(res)
        }
    } catch (error) {
        console.error(error)
    }

    res.writeHead(302, { Location: '/' })
    res.end()
}
