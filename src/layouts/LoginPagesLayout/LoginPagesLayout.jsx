import { Text, Box, Link } from 'src/components';

import styles from './LoginPagesLayout.module.scss';

const LoginPagesLayout = ({ pageName, description, sublink, children }) => (
  <div className={styles.pageWrapper}>
    <div className={styles.wrapper}>
      <Box mb={24}>
        <Text as="h1" align="center" color={'white'}>
          {pageName}
        </Text>
      </Box>
      <Box mb={63}>
        <span className={styles.textWrapper}>
          <Text align="center" size={'m'}>
            {description}
          </Text>
        </span>
      </Box>
      <form className={styles.form}>{children}</form>
      <div className={styles.sublink}>
        <Text>{sublink.title}</Text>
        <Link to={sublink.link}>{sublink.text}</Link>
      </div>
    </div>
  </div>
);

export default LoginPagesLayout;
