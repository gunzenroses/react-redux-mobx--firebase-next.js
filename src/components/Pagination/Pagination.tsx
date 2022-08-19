import { FC } from 'react';
import { useTranslation } from 'next-i18next';

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
  itemsOutputMessage = 'text',
  withText = true,
  onChange,
}) => {
  const { t } = useTranslation('pagination');
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  return (
    <div className={styles.pagination}>
      <PaginationList page={page} onChange={onChange} pagesCount={pagesCount} />
      {withText && (
        <div className={styles.pagination__text}>
          {(page - 1) * itemsPerPage + 1} – {itemsPerPage * page} {t('from')}{' '}
          {itemsCount > 100 ? '100+' : itemsCount} {t(itemsOutputMessage)}
        </div>
      )}
    </div>
  );
};

export { Pagination };
