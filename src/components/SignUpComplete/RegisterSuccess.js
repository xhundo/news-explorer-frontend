import './RegisterSuccess.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterSuccess({ completeOpen, close, closeByTarget, toggleBtn }) {
  return (
    <ModalWithForm
      isOpen={completeOpen}
      title={`Registration successfully completed!`}
      buttonTxt={'Sign in'}
      selector={`register__success-btn`}
      signUpComplete={completeOpen}
      close={close}
      closeByTarget={closeByTarget}
      handleSubmit={toggleBtn}
    ></ModalWithForm>
  );
}

export default RegisterSuccess;
