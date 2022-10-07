import { useState } from 'react';

import { defaultInputStyles } from 'src/components/DefaultInput/DefaultInput';
import Popover from 'src/components/Popover';
import Select from 'src/components/Select';
import Text from 'src/components/Text';
import { classnames } from 'src/utils';

import { defaultTableInputStyles } from '../TableDefaultInput/TableDefaultInput';

import styles from './TableSelectInput.module.scss';

const TableSelectInput = ({
  value,
  isError,
  emptyListText,
  placeholder,
  selectOptions,
  onChange,
  radius,
  width,
  height,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened(!isOpened);
  const handleClose = () => setIsOpened(false);
  const selected = selectOptions.filter((e) => e.id === value);

  return (
    <Popover
      isOpened={isOpened}
      handleClose={handleClose}
      content={<Select value={value} selectOptions={selectOptions} onChange={onChange} />}
    >
      <button
        style={{ borderRadius: radius, width, height }}
        className={classnames([
          defaultTableInputStyles.input,
          styles.selector,
          [defaultInputStyles.input__error, isError],
          [styles.defaultOption, !value],
        ])}
        onClick={toggleOpen}
      >
        <div className={styles.textPosition}>
          <Text color={value ? 'white' : 'default'} size="l">
            {selected?.[0]?.name || 'Категория'}
          </Text>
          <div className={styles.textIcon}>^</div>
        </div>
      </button>
    </Popover>
  );
};

export default TableSelectInput;
