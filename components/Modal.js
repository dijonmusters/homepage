import ReactModal from 'react-modal'
import TodoInput from './TodoInput'

ReactModal.setAppElement('#__next')
ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.3)'

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    border: 'none',
  },
}

const Modal = ({ isOpen, closeModal }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={styles}>
      <TodoInput closeModal={closeModal} />
    </ReactModal>
  )
}

export default Modal
