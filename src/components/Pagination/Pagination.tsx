import { FC } from 'react';

import styles from './Pagination.module.scss';
import { PaginationList } from './PaginationList/PaginationList';

type Props = {
  page: number;
  itemsCount?: number;
  itemsPerPage?: number;
  itemsOutputMessage?: string;
  withText?: boolean;
  onChange: (page: number) => void;
};

const Pagination: FC<Props> = ({
  page,
  itemsCount = 180,
  itemsPerPage = 12,
  itemsOutputMessage = 'вариантов аренды',
  withText = true,
  onChange,
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  return (
    <div className={styles.pagination}>
      <PaginationList page={page} onChange={onChange} pagesCount={pagesCount} />
      {withText && (
        <div className={styles.pagination__text}>
          {(page - 1) * itemsPerPage + 1} – {itemsPerPage * page} из{' '}
          {itemsCount > 100 ? '100+' : itemsCount} {itemsOutputMessage}
        </div>
      )}
    </div>
  );
};

export { Pagination };
