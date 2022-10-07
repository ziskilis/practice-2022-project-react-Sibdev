import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from 'src/api/requests';
import { DefaultInput, PasswordInput, Box, Button, Link, Text } from 'src/components';
import { PATHNAMES } from 'src/consts';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [errorText, setErrorText] = useState('');

  const onChangeLogin = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPaswword(e.target.value);

  const handleAuthSuccess = () => navigate(PATHNAMES.dashboard);

  const handleOnFocus = () => setErrorText('');

  const errorHandler = (error) => setErrorText(error);

  const authUser = () => {
    auth(
      {
        email,
        password,
      },
      handleAuthSuccess,
      errorHandler
    );
  };

  return (
    <>
      <Box hElastic>
        <DefaultInput
          value={email}
          errorText={errorText}
          isError={!!errorText}
          placeholder="Введите почту"
          onFocus={handleOnFocus}
          onChange={onChangeLogin}
        />
      </Box>
      <Box mb={75}>
        <PasswordInput
          isError={!!errorText}
          onFocus={handleOnFocus}
          onChange={onChangePassword}
          placeholder="Введите пароль"
          additionalPseudoLabel={
            <Link to={PATHNAMES.forgetPassword} textSize="m" textDecoration="under">
              Забыли пароль?
            </Link>
          }
        />
      </Box>
      <div style={{ margin: '0 auto' }}>
        <Button isDisabled={!email || !password || !!errorText} variant="primary" onClick={authUser}>
          <Text size={'xl'} color="contrast" weight={700} align="center">
            Войти
          </Text>
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
