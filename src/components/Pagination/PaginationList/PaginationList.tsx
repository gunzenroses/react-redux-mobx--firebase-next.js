import classnames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { createPagination } from 'utils/createPagination';

import styles from './PaginationList.module.scss';

type Props = {
  page: number;
  pagesCount: number;
  onChange: (page: number) => void;
};

const PaginationList: FC<Props> = ({ page, pagesCount, onChange }) => {
  const [pageList, setPageList] = useState([1]);

  useEffect(() => {
    const array = createPagination(page, pagesCount);
    setPageList(array);
  }, [page, pagesCount]);

  const handlePreviousButtonClick = (): void => {
    onChange(page - 1);
  };

  const handleNextButtonClick = (): void => {
    onChange(page + 1);
  };

  const handleNumberClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement;
    if (value !== '...') onChange(Number(value));
  };

  return (
    <div className={styles.paginationList}>
      <button
        type="button"
        onClick={handlePreviousButtonClick}
        className={classnames([styles.paginationList__arrow], {
          [styles.paginationList__arrow_hidden]: page === 1,
        })}
      >
        <span className={styles.paginationList__icon}>
          <MdArrowBack size="24px" />
        </span>
      </button>
      {pageList.map((item, key) => (
        <input
          readOnly
          key={String(key.toFixed())}
          value={item === 0 ? '...' : item}
          className={classnames([styles.paginationList__number], {
            [styles.paginationList__number_current]: page === item,
          })}
          onClick={handleNumberClick}
        />
      ))}
      <button
        type="button"
        className={classnames([styles.paginationList__arrow], {
          [styles.paginationList__arrow_hidden]: page === pagesCount,
        })}
        onClick={handleNextButtonClick}
      >
        <span className={styles.paginationList__icon}>
          <MdArrowForward size="24px" />
        </span>
      </button>
    </div>
  );
};

export { PaginationList };
