import TableDefaultInput from '../TableDefaultInput';

const TableAmountInput = ({
  radius,
  textAlign,
  errorText,
  isError,
  value,
  placeholder,
  maxLength,
  extraClasses,
  onError,
  onChange,
  onFocus,
  width,
  height,
}) => {
  const handleOnChange = (event) => {
    const value = event.target.value;
    if (!value) onChange(event);
    if (!value.match(/^[0-9]{1}[0-9.]{0,10}$/)) return;
    if (value[0] === '0') {
      if (value.length > 1 && value[1] !== '.') return;
    }
    if (value.length === 9 && value[8] !== '.') return;
    if (value.includes('.')) {
      if (!value.match(/^[0-9]{0,8}\.{1}[0-9]{0,2}$/)) return;
    }
    onChange(event);
  };

  return (
    <TableDefaultInput
      textAlign={textAlign}
      isError={isError}
      value={value.toString()}
      placeholder={placeholder}
      maxLength={maxLength}
      extraClasses={extraClasses}
      errorText={errorText}
      onChange={handleOnChange}
      radius={radius}
      onFocus={onFocus}
      width={width}
      height={height}
    />
  );
};

export default TableAmountInput;
