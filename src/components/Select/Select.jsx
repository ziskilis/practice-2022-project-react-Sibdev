import { CheckMark } from 'src/assets/icons';
import { classnames } from 'src/utils';

import styles from './Select.module.scss';

const Select = ({ value, selectOptions, onChange, selectType }) => {
  return (
    <div
      className={classnames([
        [styles.sortWrapper, selectType === 'sort'],
        [styles.selectWrapper, !selectType],
      ])}
    >
      {selectOptions.length > 0
        ? selectOptions.map((item) => (
            <div
              className={classnames([styles.item, [styles.sortItem, selectType === 'sort']])}
              key={item.id}
              name={item.id}
              onClick={() => onChange(item.id)}
            >
              <CheckMark fill={item.id === value ? 'hsla(245, 82%, 67%, 1)' : 'white'} />
              {item.name}
            </div>
          ))
        : null}
    </div>
  );
};

export default Select;
