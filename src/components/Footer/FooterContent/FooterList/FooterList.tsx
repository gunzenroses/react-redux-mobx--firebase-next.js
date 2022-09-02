import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './FooterList.module.scss';

type Props = {
  title: string;
  links: { text: string; link: string }[];
};

const FooterList: FC<Props> = ({ title, links }) => {
  return (
    <div className={styles.footerList__list}>
      <h3 className={styles.footerList__subtitle}>{title}</h3>
      {links.map((item) => (
        <Link
          to={item.link}
          className={styles.footerList__link}
          key={item.text}
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
};

export { FooterList };
