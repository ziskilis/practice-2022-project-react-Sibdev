import { useState } from 'react';

import { EyeClosed, EyeOpened } from 'src/assets/icons';
import { DefaultInput } from 'src/components';

import styles from './PasswordInput.module.scss';

const PasswordInput = ({ additionalPseudoLabel, isError, errorText, labelText, placeholder, onFocus, onChange }) => {
  const [isPassShown, setIsPassShown] = useState(false);

  const handlePassVisibility = (event) => {
    event.preventDefault();
    setIsPassShown(!isPassShown);
  };

  return (
    <DefaultInput
      type={isPassShown ? 'text' : 'password'}
      labelText={labelText}
      isError={isError}
      errorText={errorText}
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={onChange}
      additionalPseudoLabel={additionalPseudoLabel}
      className={styles.passInput}
      inputButton={
        <button className={styles.showPassButton} onClick={handlePassVisibility}>
          {isPassShown ? <EyeClosed /> : <EyeOpened />}
        </button>
      }
    />
  );
};

export default PasswordInput;
