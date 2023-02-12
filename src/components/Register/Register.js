import ModalWithForm from '../ModalWithForm/ModalWithForm';

import './Register.css';
import { useEffect, useState } from 'react';

function Register({
  modalOpen,
  close,
  handleCloseByTarget,
  modalSwitch,
  handleComplete,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    // eslint-disable-next-line
  }, [modalOpen]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <ModalWithForm
      isOpen={modalOpen}
      name="register"
      buttonTxt={`Sign up`}
      selector={`register__button`}
      title={`Sign up`}
      handleSubmit={(e) => handleComplete(e)}
      showSignUp={modalOpen}
      close={close}
      closeByTarget={handleCloseByTarget}
      nextModal={modalSwitch}
    >
      <label className="register__email-label">Email</label>
      <div className="register__content">
        <input
          type="email"
          value={email}
          minLength="2"
          maxLength="30"
          placeholder="Enter email"
          className="register__input-email"
          required
          name="email"
          onChange={handleEmail}
        />
      </div>
      <label className="register__password-label">Password</label>
      <div className="register__content-password">
        <input
          required
          value={password}
          type="password"
          name="password"
          className="register__input-password"
          placeholder="Enter password"
          onChange={handlePassword}
        />
      </div>
      <label className="register__label-username">Username</label>
      <div className="register__content-username">
        <input
          required
          value={username}
          type="text"
          placeholder="Enter your username"
          className="register__input-username"
          minLength="2"
          maxLength="30"
          name="username"
          onChange={handleUsername}
        />
      </div>
    </ModalWithForm>
  );
}

export default Register;
