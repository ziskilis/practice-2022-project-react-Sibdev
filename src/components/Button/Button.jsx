import { classnames } from 'src/utils';

import styles from './Button.module.scss';

const Button = ({
  childrenRotation = 0,
  tabIndex,
  variant,
  bgColor,
  radius = 1000,
  width,
  height,
  isDisabled,
  onClick,
  children,
}) => {
  const buttonOnClick = (e) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <button
      className={classnames([styles.button, styles[`button__${variant}`], styles[`button-color__${bgColor}`]])}
      tabIndex={tabIndex}
      style={{
        height,
        borderRadius: radius,
        width,
        transform: `rotate(${childrenRotation}deg)`,
      }}
      disabled={isDisabled}
      onClick={buttonOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
