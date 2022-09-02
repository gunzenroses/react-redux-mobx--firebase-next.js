import React, { FC, useRef, useState } from 'react';

import styles from './TextArea.module.scss';
import { Button } from '../Button/Button';

type Props = {
  title?: string;
  name?: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
};

const TextArea: FC<Props> = ({
  title = 'Новый комментарий',
  name = 'newComment',
  placeholder = 'Здесь мог быть ваш комментарий',
  onSubmit,
}) => {
  const [text, setText] = useState('');
  const textArea = useRef<HTMLTextAreaElement>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(textArea.current?.value || '');
    setText('');
  };

  return (
    <form className={styles.textarea__wrapper} onSubmit={handleOnSubmit}>
      <h3 className={styles.textarea__title}>{title}</h3>
      <textarea
        value={text}
        onChange={handleOnChange}
        name={name}
        className={styles.textarea}
        placeholder={placeholder}
        ref={textArea}
      />
      <Button type="submit" sizeFitContent>
            Отправить
      </Button>
    </form>
  ) 
};

export { TextArea };
