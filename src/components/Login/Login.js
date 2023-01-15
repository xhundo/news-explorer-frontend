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
}) {
  const {
    email,
    password,
    username,
    handleChange,
    errors,
    handlePasswordChange,
    handleUsernameChange,
    isValid,
    resetForm,
  } = useFormValidator();

  useEffect(() => {
    resetForm('', null, false);
  }, [modalOpen, revertOptions]);

  const handleUserLogin = (e) => {
    e.preventDefault();
    handleSubmit(email, password)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ModalWithForm
      isOpen={modalOpen}
      buttonTxt={showSignUp ? `Sign up` : `Sign in`}
      name={showSignUp ? `signup` : `signin`}
      title={
        signUpComplete
          ? `Registration successfully completed!`
          : showSignUp
          ? `Sign up`
          : `Sign in`
      }
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
    >
      {signUpComplete ? (
        ``
      ) : (
        <>
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
          {showSignUp ? (
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter password"
              minLength="2"
              maxLength="30"
              className={
                showSignUp ? `signin__input-signup` : `signin__input-password`
              }
            />
          ) : (
            <div className="login__input-password">
              <input
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Enter password"
                minLength="2"
                maxLength="30"
                className={
                  showSignUp ? `signin__input-signup` : `signin__input-password`
                }
              />
              <span className="signin__input-error">{errors?.password}</span>
            </div>
          )}
        </>
      )}
      {signUpComplete ? (
        ``
      ) : (
        <>
          {showSignUp ? (
            <div className="signin__options">
              <label required className="signin__label-password">
                Username
              </label>
              <input
                value={username}
                onChange={handleUsernameChange}
                type="text"
                placeholder="Enter your username"
                className="login__input-username"
              />
              <span className="signin__input-error">{errors?.username}</span>
            </div>
          ) : (
            ``
          )}
        </>
      )}
    </ModalWithForm>
  );
}

export default Login;
