/* eslint-disable handle-callback-err */
import jwksClient from 'jwks-rsa'

const client = jwksClient({
  jwksUri: 'https://sso.escolaapp.com/.well-known/openid-configuration/jwks'
})

interface GetKeyProps {
  kid: string
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getKey(header: GetKeyProps) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey()

    console.log(signingKey)
  })
}
export default getKey
