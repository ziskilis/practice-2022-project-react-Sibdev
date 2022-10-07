import { Link as RouterLink } from 'react-router-dom';

import { Text } from 'src/components';

import styles from './Link.module.scss';

const Link = ({ to, target, textSize, textDecoration, children }) => (
  <RouterLink className={styles.link} target={target} to={to}>
    <Text size={textSize} decoration={textDecoration} color="brand">
      {children}
    </Text>
  </RouterLink>
);

export default Link;
