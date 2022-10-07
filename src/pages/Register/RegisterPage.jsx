import { PATHNAMES } from 'src/consts';
import { LoginPagesLayout } from 'src/layouts';

import RegisterForm from './RegisterForm';

const RegisterPage = () => (
  <LoginPagesLayout
    pageName="Регистрация"
    description="Сделайте управление вашими финансами 
    простым и увлекательным!"
    sublink={{
      title: 'У вас уже есть акаунт?',
      text: 'Авторизировться',
      link: PATHNAMES.login,
    }}
  >
    <RegisterForm />
  </LoginPagesLayout>
);

export default RegisterPage;
