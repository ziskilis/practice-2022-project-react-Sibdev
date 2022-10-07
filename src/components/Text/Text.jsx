import { classnames } from 'src/utils';
import { getDefaultTextColor, getDefaultTextWeight } from 'src/utils/Text';

import styles from './Text.module.scss';

const Text = ({
  as: Wrapper = 'p',
  opacity,
  color,
  weight,
  size,
  children,
  decoration,
  align = 'left',
  lineHeight = '100%',
}) => {
  if (typeof children !== 'string') {
    throw new Error('Text component accepts only string children');
  }

  if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(Wrapper)) {
    throw new Error('Text component accepts only h1-h6 and p tags');
  }

  const textColor = color ? color : getDefaultTextColor(Wrapper);
  const textWeight = weight ? weight : getDefaultTextWeight(Wrapper);
  const textSize = size;
  const textDecoration = decoration;

  return (
    <Wrapper
      style={{ opacity, lineHeight }}
      className={classnames([
        styles[`color__${textColor}`],
        styles[`weight__${textWeight}`],
        [styles[`size__${textSize}`], !!size],
        styles[`align__${align}`],
        [styles[`decoration__${textDecoration}`], !!decoration],
      ])}
    >
      {children}
    </Wrapper>
  );
};

export default Text;
