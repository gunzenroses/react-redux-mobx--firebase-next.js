import React, { FC } from 'react';
import classnames from 'classnames';

import styles from './Input.module.scss';

type Props = {
  name?: string;
  type?: string;
  placeholder?: string;
  isReadOnly?: boolean;
  isOpen?: boolean;
  withArrow?: boolean;
  parentValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  type = 'text',
  placeholder = 'Email',
  isReadOnly = false,
  isOpen = false,
  withArrow = false,
  parentValue = undefined,
  onChange = () => {},
  name = ''
}) => {
  const handleInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={classnames({ [styles.input__wrapper]: withArrow })}>
      <input
        className={classnames([styles.input], {
          [styles.input_withArrow]: withArrow,
          [styles.input_isReadonly]: isReadOnly,
          [styles.input_isOpen]: isOpen
        })}
        name={name}
        type={type}
        readOnly={isReadOnly}
        placeholder={placeholder}
        value={parentValue}
        onChange={handleInputOnChange}
      />
      {withArrow && (
        <button
          className={styles.input__button}
          aria-label="send form"
          type="submit"
        >
          <span className={styles.input__buttonInner} />
        </button>
      )}
    </div>
  );
};

export { Input };
