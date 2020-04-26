import axios from 'axios'

const exchangeToken = code => {
  const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env

  return axios.post('https://todoist.com/oauth/access_token', {
    client_id,
    client_secret,
    code,
  })
}

module.exports = async (req, res) => {
  const { code } = req.query
  try {
    const { data } = await exchangeToken(code)
    res.send(data)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
