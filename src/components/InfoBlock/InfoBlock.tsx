import { FC } from 'react';

import styles from './InfoBlock.module.scss';

type Props = {
  title?: string;
  text?: string;
};

const InfoBlock: FC<Props> = ({ title = 'Отмена', text = '' }) => {
  return (
    <div data-testid="InfoBlock-wrapper">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export { InfoBlock };
