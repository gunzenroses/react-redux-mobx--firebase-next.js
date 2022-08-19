import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './RoomInfoList.module.scss';
import { RoomInfo, Props as RoomInfoProps } from './RoomInfo/RoomInfo';
import { defaultRoomInfoProp } from './constants';

type Props = {
  data?: RoomInfoProps[];
};

const RoomInfoList: FC<Props> = ({ data = defaultRoomInfoProp }) => {
  const { t } = useTranslation('room-details');
  return (
    <div data-testid="RoomInfoList-wrapper" className={styles.RoomInfoList}>
      <h2
        data-testid="RoomInfoList-title"
        className={styles.RoomInfoList__title}
      >
        {t('roomInfo')}
      </h2>
      {data.map(({ title, text, img }, key) => {
        return (
          <RoomInfo
            data-testid="RoomInfoList-content"
            title={title}
            text={text}
            key={String(key.toFixed())}
            img={img}
          />
        );
      })}
    </div>
  );
};

export { RoomInfoList };
