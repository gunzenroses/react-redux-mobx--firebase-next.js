import { FC } from 'react';

import styles from './BulletList.module.scss';
import { defaultTextArray } from './constants';

type Props = {
  textArray?: string[];
  title?: string
};

const BulletList: FC<Props> = ({ textArray = defaultTextArray, title = 'Правила' }) => {
  return (
    <section className={styles.bulletList}>
      <p className={styles.bulletList__title}>{title}</p>
      <ul className={styles.bulletList__list}>
        {textArray.map((text, key) => (
          <li className={styles.bulletList__bullet} key={String(key)} >{text}</li>
        ))}
      </ul>
    </section>
  );
};

export { BulletList };
