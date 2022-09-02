import { FC } from 'react';
import { MdArrowForward } from 'react-icons/md';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

type Props = {
  type: 'signIn' | 'registration' | 'submit' | 'default';
  children: string;
  href?: string;
  disabled?: boolean;
  theme?: 'main' | 'landing' | 'details' | 'authorization';
  sizeFitContent?: boolean;
  onClick?: () => void;
};

const cn = classNames.bind(styles);

const Button: FC<Props> = ({
  type,
  href = '',
  children,
  disabled = false,
  theme = 'main',
  sizeFitContent = false,
  onClick,
}) => {
  const buttonClass = cn({
    button: true,
    button_type_signIn: type === 'signIn',
    button_type_registration: type === 'registration',
    button_type_submit: type === 'submit',
    button_in_landing: theme === 'landing',
    button_in_details: theme === 'details',
    button_in_authorization: theme === 'authorization',
    button_size_fitContent: sizeFitContent,
  });
  return href === '' ? (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {type === 'submit' && (
        <span className={styles.button__icon}>
          <MdArrowForward size="24px" />
        </span>
      )}
      <span className={styles.button_type_signInText}>{children}</span>
    </button>
  ) : (
    <Link to={href || ''} className={buttonClass} onClick={onClick}>
      <span className={styles.button_type_signInText}>{children}</span>
    </Link>
  );
};

export { Button };
