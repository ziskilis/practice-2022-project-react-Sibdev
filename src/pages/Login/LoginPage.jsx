import { PATHNAMES } from 'src/consts';
import { LoginPagesLayout } from 'src/layouts';

import LoginForm from './LoginForm';

const LoginPage = () => (
  <LoginPagesLayout
    pageName="Авторизация"
    description="Пожалуйста, авторизуйтесь и начните свое приключение"
    sublink={{
      title: 'Нет аккаунта?',
      text: 'Зарегистрируйтесь',
      link: PATHNAMES.register,
    }}
  >
    <LoginForm />
  </LoginPagesLayout>
);

export default LoginPage;
