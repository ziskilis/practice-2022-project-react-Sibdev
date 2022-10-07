import { useId } from 'react';

import { Box, Text } from 'src/components';
import { classnames } from 'src/utils';

import styles from './Checkbox.module.scss';

const Checkbox = ({ isChecked, text, onClick }) => {
  const id = useId();

  const handleKeydown = (e) => {
    if (['Enter', 'NumpadEnter'].includes(e.code)) onClick();
  };

  return (
    <label htmlFor={id} className={styles.wrapper}>
      <div
        className={classnames([styles.pseudoCheckbox, [styles.pseudoCheckbox__checked, isChecked]])}
        onKeyDown={handleKeydown}
        tabIndex={0}
      />
      <Box ml={10}>
        <Text color="white" size="m">
          {text}
        </Text>
      </Box>
      <input
        id={id}
        checked={isChecked}
        aria-hidden
        type="checkbox"
        onChange={onClick}
        className={styles.hiddenInput}
      />
    </label>
  );
};

export default Checkbox;
