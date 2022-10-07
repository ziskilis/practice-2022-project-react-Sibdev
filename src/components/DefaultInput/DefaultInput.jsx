import { useId } from 'react';

import { Text } from 'src/components';
import { classnames } from 'src/utils';

import InputLabel from '../InputLabel';

import styles from './DefaultInput.module.scss';

export { styles as defaultInputStyles };

const DefaultInput = ({
  type = 'text',
  isError,
  errorText,
  labelText,
  additionalPseudoLabel,
  inputButton,
  value,
  placeholder,
  onFocus,
  onChange,
  className,
}) => {
  const inputId = useId();
  return (
    <>
      <div className={styles.labelWrapper}>{labelText && <InputLabel id={inputId} text={labelText} />}</div>
      <div className={styles.inputWithButtonWrapper}>
        {errorText && (
          <div className={styles.inputErrorText}>
            <Text align="center" color="white" size="xs">
              {errorText}
            </Text>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={classnames([styles.input, [styles.input__error, isError], className])}
          value={value}
          placeholder={placeholder}
          onFocus={onFocus}
          onChange={onChange}
        />
        {inputButton}
      </div>
      <div className={styles.additionalPseudoLabelWrapper}>{additionalPseudoLabel}</div>
    </>
  );
};

export default DefaultInput;
