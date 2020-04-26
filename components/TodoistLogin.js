import styled from 'styled-components'

const LoginPanel = styled.a`
  background: rgba(255, 255, 255, 0.1);
  width: fit-content;
  margin: 0 auto;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
`

const Login = styled.span`
  position: relative;
  transform: translateY(1rem);
`

const Todoist = () => {
  const url = `https://todoist.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=data:read_write&state=test-cra-app`

  return (
    <LoginPanel href={url} className="link">
      <img src="todoist-logo.png" alt="Todoist logo" />
      <Login>Login</Login>
    </LoginPanel>
  )
}

export default Todoist
