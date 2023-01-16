import { useEffect } from 'react';
import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './Login.css';
import { useFormValidator } from '../FormValidator/FormValidator';

function Login({
  modalOpen,
  handleClose,
  handleSignUp,
  showSignUp,
  revertOptions,
  signUpComplete,
  handleSignupComplete,
  revertSignUp,
  handleTarget,
  handleSubmit,
  handleLogin,
  handleAuth,
  handleModal,
  handleRegister,
}) {
  const {
    email,
    password,
    handleChange,
    errors,
    handlePasswordChange,
    isValid,
    resetForm,
  } = useFormValidator();

  useEffect(() => {
    resetForm(null, false);
    // eslint-disable-next-line
  }, [modalOpen]);

  const handleUserLogin = (e) => {
    e.preventDefault();
    handleSubmit(email, password)
      .then(() => {
        resetForm('', null, false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ModalWithForm
      isOpen={modalOpen}
      buttonTxt={showSignUp ? `Sign up` : `Sign in`}
      name={showSignUp ? `signup` : `signin`}
      title={showSignUp ? `Sign up` : `Sign in`}
      handleSubmit={handleUserLogin}
      selector={'signin__modal-button'}
      close={handleClose}
      handleOptions={handleSignUp}
      showSignUp={showSignUp}
      revertOptions={revertOptions}
      signUpComplete={signUpComplete}
      handleSignUpComplete={handleSignupComplete}
      revertSignUp={revertSignUp}
      closeByTarget={handleTarget}
      isValid={isValid}
      nextModal={handleRegister}
    >
      <label className="signin__label-email">Email</label>
      <div className="login__input">
        <input
          required
          value={email}
          type="email"
          onChange={handleChange}
          placeholder="Enter email"
          className="signin__input-email"
        />
        <span className="signin__input-error">{errors?.email}</span>
      </div>
      <label className="signin__label-password">Password</label>
      <div className="login__input-password">
        <input
          required
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Enter password"
          className={
            showSignUp ? `signin__input-signup` : `signin__input-password`
          }
        />
        <span className="signin__input-error">{errors?.password}</span>
      </div>
    </ModalWithForm>
  );
}

export default Login;
