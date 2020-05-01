import Modal from 'react-modal'
import { FiPlusCircle } from 'react-icons/fi'
import styled from 'styled-components'

const UnstyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const Button = styled(UnstyledButton)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  color: #777;
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
  return (
    <Button>
      <Icon>
        <FiPlusCircle size="3rem" strokeWidth="1" />
      </Icon>
    </Button>
  )
}

export default NewTodo
