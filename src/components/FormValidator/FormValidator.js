import { useCallback, useState } from 'react';

export function useFormValidator() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors({ ...errors, username: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setEmail('');
      setPassword('');
      setUsername('');
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [email, username, password, setErrors, setIsValid],
  );

  return {
    email,
    password,
    username,
    handleChange,
    errors,
    isValid,
    handlePasswordChange,
    handleUsernameChange,
    resetForm,
  };
}
