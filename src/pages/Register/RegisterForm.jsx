import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register, auth } from 'src/api/requests';
import { Box, Checkbox, DefaultInput, PasswordInput, Button, Text } from 'src/components';
import { PATHNAMES } from 'src/consts';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeName = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeIsAgree = () => setIsAgree(!isAgree);

  const onUsernameFocus = () => setUsernameError('');
  const onPasswordFocus = () => setPasswordError('');
  const onEmailFocus = () => setEmailError('');

  const handleError = (error) => {
    error?.username && setUsernameError(error.username[0]);
    error?.password && setPasswordError(error.password[0]);
    error?.email && setEmailError(error.email[0]);
  };

  const handleAuthSuccess = () => navigate(PATHNAMES.dashboard);
  const authErrorHandler = () => navigate(PATHNAMES.login);

  const handleRegisterSuccess = () => {
    auth(
      {
        email,
        password,
      },
      handleAuthSuccess,
      authErrorHandler
    );
  };

  const registerUser = () => {
    register(
      {
        username,
        email,
        password,
      },
      handleRegisterSuccess,
      handleError
    );
  };

  return (
    <>
      <Box mt={-25} hElastic>
        <DefaultInput
          value={username}
          isError={!!usernameError}
          errorText={usernameError}
          placeholder="Введите имя пользователя"
          onFocus={onUsernameFocus}
          onChange={onChangeName}
        />
      </Box>
      <Box hElastic>
        <DefaultInput
          value={email}
          isError={!!emailError}
          errorText={emailError}
          placeholder="Введите почту"
          onFocus={onEmailFocus}
          onChange={onChangeEmail}
        />
      </Box>
      <Box mb={5}>
        <PasswordInput
          isError={!!passwordError}
          errorText={passwordError}
          onFocus={onPasswordFocus}
          onChange={onChangePassword}
          placeholder="Введите пароль"
        />
      </Box>
      <Box mb={30}>
        <Checkbox isChecked={isAgree} text="Я со всем согласен отпутите" onClick={onChangeIsAgree} />
      </Box>
      <div style={{ margin: '0 auto' }}>
        <Button
          isDisabled={
            !username || !email || !isAgree || !password || !!usernameError || !!emailError || !!passwordError
          }
          variant="primary"
          onClick={registerUser}
        >
          <Text size={'xl'} weight={700} color="contrast" align="center">
            Зарегистрироваться
          </Text>
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
