import { useState, useEffect } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Modal from './Modal'

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

const toggleModal = setIsModalOpen => () => {
  setIsModalOpen(isModalOpen => !isModalOpen)
}

const closeModal = setIsModalOpen => () => {
  setIsModalOpen(false)
}

const NewTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSmallScreen = useMediaQuery({ maxWidth: 800 })

  const handleModalOpen = e => {
    const isAlphaNumeric = e.key.match(/^[0-9A-Za-z]$/)
    !isModalOpen && isAlphaNumeric && setIsModalOpen(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleModalOpen)

    return () => {
      window.removeEventListener('keydown', handleModalOpen)
    }
  })

  const renderFixed = () => (
    <FixedButton onClick={toggleModal(setIsModalOpen)}>New task</FixedButton>
  )

  const renderFloating = () => (
    <FloatingButton onClick={toggleModal(setIsModalOpen)}>
      <Icon>
        <FiPlusCircle size="3rem" strokeWidth="1" />
      </Icon>
    </FloatingButton>
  )

  return (
    <>
      {isSmallScreen ? renderFixed() : renderFloating()}
      <Modal isOpen={isModalOpen} closeModal={closeModal(setIsModalOpen)} />
    </>
  )
}

export default NewTodo
