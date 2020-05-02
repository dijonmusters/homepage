import Modal from 'react-modal'
import { FiPlusCircle } from 'react-icons/fi'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const UnstyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const FloatingButton = styled(UnstyledButton)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  color: #777;
`

const FixedButton = styled(UnstyledButton)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  padding: 2rem;
  background: white;
  box-shadow: 0 0 6px 2px #efefef;
  z-index: 1;
`

const Sticky = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`

const Icon = styled.span`
  position: relative;

  &:hover {
    &:before {
      color: #777;
      opacity: 1;
      position: absolute;
      white-space: nowrap;
      content: 'New task';
      top: 50%;
      pointer-events: none;
      animation: slidein 0.3s forwards;
      transition: opacity 0.3s ease-in-out;
    }
  }

  &:before {
    color: #777;
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    content: 'New task';
    padding-right: 0.25rem;
    top: 50%;
    pointer-events: none;
    animation: slideout 0.3s forwards;
    transition: opacity 0.3s ease-in-out;
  }

  @keyframes slidein {
    0% {
      transform: translate(0%, -50%);
    }
    100% {
      transform: translate(-100%, -50%);
    }
  }

  @keyframes slideout {
    0% {
      transform: translate(-100%, -50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`

const NewTodo = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 800 })

  return isSmallScreen ? (
    <FixedButton>New task</FixedButton>
  ) : (
    <FloatingButton>
      <Icon>
        <FiPlusCircle size="3rem" strokeWidth="1" />
      </Icon>
    </FloatingButton>
  )
}

export default NewTodo
