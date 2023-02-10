import { useEffect, useMemo } from 'react';
import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './Login.css';
import { useFormWithValidation } from '../FormValidator/FormValidator';

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
  handleRegister,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, [modalOpen]);

  const handleUserLogin = (e) => {
    e.preventDefault();
    handleSubmit(values.email, values.password)
      .then(() => {
        resetForm();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(values, errors);

  return (
    <ModalWithForm
      isOpen={modalOpen}
      buttonTxt={showSignUp ? `Sign up` : `Sign in`}
      name={showSignUp ? `signup` : `signin`}
      title={showSignUp ? `Sign up` : `Sign in`}
      handleSubmit={handleUserLogin}
      selector={'login__modal-button'}
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
      <label className="login__label-email">Email</label>
      <div className="login__input">
        <input
          required
          value={values.email || ''}
          type="email"
          onChange={handleChange}
          placeholder="Enter email"
          className="login__input-email"
          name="email"
        />
        <span className="login__input-error">{errors?.email}</span>
      </div>
      <label className="login__label-password">Password</label>
      <div className="login__input-password">
        <input
          required
          value={values.password || ''}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter password"
          className={showSignUp ? `login__input-signup` : `login__input-pass`}
        />
        <span className="login__input-error">{errors?.password}</span>
      </div>
    </ModalWithForm>
  );
}

export default Login;
