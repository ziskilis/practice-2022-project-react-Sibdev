import { Text } from 'src/components';

const InputLabel = ({ id, text }) => (
  <label htmlFor={id}>
    <Text size="xs">{text}</Text>
  </label>
);

export default InputLabel;
