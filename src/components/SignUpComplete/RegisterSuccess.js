import './RegisterSuccess.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function RegisterSuccess({ completeOpen, close, closeByTarget, toggleBtn }) {
  return (
    <ModalWithForm
      isOpen={completeOpen}
      title={`Registration successfully completed!`}
      text={'Sign in'}
      name="complete"
      option={`register__success-btn`}
      reverse={toggleBtn}
      signUpComplete={completeOpen}
      close={close}
      closeByTarget={closeByTarget}
    />
  );
}

export default RegisterSuccess;
