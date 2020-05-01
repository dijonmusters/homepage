import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginPanel = styled.a`
  background: rgba(0, 0, 0, 0.05);
  /* width: fit-content; */
  /* margin: 0 auto; */
  padding: 4rem 6rem;
  /* border: 1px solid #afafaf; */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #444;
  text-decoration: none;
`

const Img = styled.img`
  height: 100px;
`

const Todoist = () => {
  const url = `https://todoist.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=data:read_write&state=test-cra-app`

  return (
    <Container>
      <LoginPanel href={url} className="link">
        <Img src="todoist-logo.png" alt="Todoist logo" />
        Login
      </LoginPanel>
    </Container>
  )
}

export default Todoist
