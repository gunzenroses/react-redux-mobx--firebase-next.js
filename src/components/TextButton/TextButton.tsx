import { FC } from 'react';

import styles from './TextButton.module.scss';

type Props = {
  text: string;
  onClick?: () => void;
};

const TextButton: FC<Props> = ({ text, onClick = () => {} }) => {
  return (
    <button type="button" className={styles.textButton} onClick={onClick}>
      {text}
    </button>
  );
};

export { TextButton };
