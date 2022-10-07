import Text from 'src/components/Text';
import { classnames } from 'src/utils';

import styles from './TableDefaultInput.module.scss';

export { styles as defaultTableInputStyles };

const TableDefaultInput = ({
  type = 'text',
  textAlign = 'center',
  isError,
  errorText,
  value,
  placeholder,
  maxLength,
  onFocus,
  extraClasses,
  onChange,
  width,
  height,
  radius,
}) => {
  return (
    <div className={styles.inputWithButtonWrapper}>
      {errorText && (
        <div className={styles.inputErrorText}>
          <Text align="center" color="white" size="xs">
            {errorText}
          </Text>
        </div>
      )}
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onFocus={onFocus}
        style={{
          borderRadius: radius,
          width,
          height,
        }}
        className={classnames([
          styles.input,
          extraClasses,
          [styles.input__error, isError],
          styles[`input__align-${textAlign}`],
        ])}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TableDefaultInput;
