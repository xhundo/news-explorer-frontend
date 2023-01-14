import { useEffect } from 'react';
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
  handleLogin,
  handleAuth,
  handleModal,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
  }, [modalOpen, revertOptions]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    handleSubmit(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
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
    >
      {signUpComplete ? (
        ``
      ) : (
        <>
          <label className="signin__label-email">Email</label>
          <input
            required
            value={email}
            type="email"
            onChange={(e) => handleEmail(e)}
            placeholder="Enter email"
            className="signin__input-email"
          />
          <label className="signin__label-password">Password</label>
          <input
            value={password}
            onChange={(e) => handlePassword(e)}
            type="password"
            placeholder="Enter password"
            className={
              showSignUp ? `signin__input-signup` : `signin__input-password`
            }
          />
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
                onChange={(e) => handleUsername(e)}
                type="text"
                placeholder="Enter your username"
                className="signin__input-password"
              />
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
