import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Centered from '../components/styled/Centered'

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

  return <Centered>Exchanging token</Centered>
}

OAuthResponse.getInitialProps = ({ query: { code } }) => {
  return { code }
}

export default OAuthResponse
