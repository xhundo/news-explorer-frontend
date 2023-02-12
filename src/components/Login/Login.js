import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './Login.css';

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
  handleLogged,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    // eslint-disable-next-line
  }, [modalOpen]);

  return (
    <ModalWithForm
      isOpen={modalOpen}
      buttonTxt={showSignUp ? `Sign up` : `Sign in`}
      name={showSignUp ? `signup` : `signin`}
      title={showSignUp ? `Sign up` : `Sign in`}
      handleSubmit={(e) => handleLogged(e)}
      selector={'login__modal-button'}
      close={handleClose}
      handleOptions={handleSignUp}
      showSignUp={showSignUp}
      revertOptions={revertOptions}
      signUpComplete={signUpComplete}
      handleSignUpComplete={handleSignupComplete}
      revertSignUp={revertSignUp}
      closeByTarget={handleTarget}
      nextModal={handleRegister}
    >
      <label className="login__label-email">Email</label>
      <div className="login__input">
        <input
          required
          value={email}
          type="email"
          onChange={handleEmail}
          placeholder="Enter email"
          className="login__input-email"
          name="email"
        />
      </div>
      <label className="login__label-password">Password</label>
      <div className="login__input-password">
        <input
          required
          value={password}
          onChange={handlePassword}
          type="password"
          name="password"
          placeholder="Enter password"
          className={showSignUp ? `login__input-signup` : `login__input-pass`}
        />
      </div>
    </ModalWithForm>
  );
}

export default Login;
