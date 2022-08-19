import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './FooterList.module.scss';

type Props = {
  title: string;
  links: { text: string; link: string }[];
};

const FooterList: FC<Props> = ({ title, links }) => {
  const { t } = useTranslation('footer');
  return (
    <div className={styles.footerList__list}>
      <h3 className={styles.footerList__subtitle}>{title}</h3>
      {links.map((item) => (
        <Link href={item.link} key={item.text} passHref>
          <a className={styles.footerList__link} href="replace">
            {t(item.text)}
          </a>
        </Link>
      ))}
    </div>
  );
};

export { FooterList };
