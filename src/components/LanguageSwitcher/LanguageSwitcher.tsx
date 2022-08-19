import { useRef, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import useOnClickOutside from 'hooks/useOnClickOutside';

import styles from './LanguageSwitcher.module.scss';
import rusFlag from './img/rus.png';
import usaFlag from './img/usa.png';

const LanguageSwitcher = () => {
  const languages = {
    ru: rusFlag,
    en: usaFlag,
  };
  type langType = keyof typeof languages;
  const { locale, asPath } = useRouter();
  const [isOpen, setOpen] = useState(false);
  const switcher = useRef(null);
  const [lang, setLang] = useState<langType>(locale === 'en' ? 'en' : 'ru');

  useOnClickOutside(switcher, () => setOpen(false));

  const handleToggle = () => {
    setOpen(!isOpen);
  };
  const handleToggleLang = (language: langType) => {
    setLang(language);
    setOpen(!isOpen);
  };
  return (
    <div className={styles.switcher} ref={switcher}>
      <div>
        <button onClick={handleToggle} type="button" className={styles.btn}>
          <Image src={languages[lang]} alt="flag" width={22} height={22} />
          <MdExpandMore className={styles.arrow} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.entries(languages)
            .filter(([key]) => lang !== key)
            .map(([key, val]) => {
              return (
                <Link key={key} href={asPath} locale={key}>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => handleToggleLang(key as langType)}
                  >
                    <Image src={val} alt="flag" width={22} height={22} />
                  </button>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export { LanguageSwitcher };
