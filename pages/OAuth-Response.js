import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const OAuthResponse = ({ code }) => {
  const router = useRouter()

  const exchangeToken = async () => {
    const { data } = await axios.get(`/api/get-token/${code}`)
    localStorage.setItem('token', data.access_token)
    router.push('/')
  }

  useEffect(() => {
    exchangeToken(code)
  }, [])

  return <p>Exchanging token</p>
}

OAuthResponse.getInitialProps = ({ query: { code } }) => {
  return { code }
}

export default OAuthResponse
