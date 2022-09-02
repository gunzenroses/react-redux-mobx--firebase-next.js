import { FC } from 'react';

import styles from './RoomInfoList.module.scss';
import { RoomInfo } from './RoomInfo/RoomInfo';
import { defaultRoomInfoProp } from './constants';

type Props = {
  data?: Info[];
};

const RoomInfoList: FC<Props> = ({ data = defaultRoomInfoProp }) => {
  return (
    <div className={styles.RoomInfoList}>
      <h2 className={styles.RoomInfoList__title}>Сведения о номере</h2>
      {data.map(({ title, text, img }, key) => {
        return (
          <RoomInfo title={title} text={text} key={String(key)} img={img} />
        );
      })}
    </div>
  );
};

export { RoomInfoList };
