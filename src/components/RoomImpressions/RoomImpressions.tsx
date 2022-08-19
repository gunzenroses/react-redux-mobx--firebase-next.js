import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './RoomImpressions.module.scss';

type Props = {
  great: number;
  good: number;
  ok: number;
  crap: number;
};

const RoomImpressions: FC<Props> = ({ great, good, ok, crap }) => {
  const { t } = useTranslation('room-details');
  const votes = [great, good, ok, crap];
  const sum = Object.values(votes).reduce((acc, curr) => acc + curr);
  const fullCircle = 100;
  let dashoffset = 0;

  return (
    <div data-testid="RoomImpressions-wrapper">
      <h3 data-testid="RoomImpressions-title" className={styles.title}>
        {t('roomImpression.title')}
      </h3>
      <figure data-testid="RoomImpressions-figure" className={styles.figure}>
        <svg
          className={styles.chart}
          width="123px"
          height="124px"
          viewBox="0 0 34 34"
          data-testid="RoomImpressions-svg"
        >
          <linearGradient
            data-testid="RoomImpressions-linearGradient"
            id="gradient1"
            x1="50%"
            y1="0%"
            x2="0%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#FFE39C" />
            <stop offset="100%" stopColor="#FFBA9C" />
          </linearGradient>
          <linearGradient
            data-testid="RoomImpressions-linearGradient"
            id="gradient2"
          >
            <stop offset="0%" stopColor="#6FCF97" />
            <stop offset="100%" stopColor="#66D2EA" />
          </linearGradient>
          <linearGradient
            data-testid="RoomImpressions-linearGradient"
            id="gradient3"
          >
            <stop offset="0%" stopColor="#BC9CFF" />
            <stop offset="100%" stopColor="#8BA4F9" />
          </linearGradient>
          <linearGradient
            data-testid="RoomImpressions-linearGradient"
            id="gradient4"
          >
            <stop offset="0%" stopColor="#909090 " />
            <stop offset="100%" stopColor="#3D4975" />
          </linearGradient>
          {Object.values(votes).map((val, i) => {
            const dashArray = fullCircle / (sum / val);
            const circle = (
              <circle
                className={styles.unit}
                strokeDasharray={`${
                  dashArray > 0 ? dashArray - 0.8 : 0
                } ${fullCircle}`}
                strokeDashoffset={dashoffset}
                stroke={`url(#gradient${i + 1})`}
                r="15.9"
                cx="50%"
                cy="50%"
                key={i.toFixed()}
              />
            );
            dashoffset -= fullCircle / (sum / val);
            return circle;
          })}
          <g data-testid="RoomImpressions-g" className={styles.text}>
            <text className={styles.sum} x="-51%" y="-52%">
              {sum}
            </text>
            <text className={styles.votes} x="-51%" y="-37%">
              {t('roomImpression.votes')}
            </text>
          </g>
        </svg>
        <figcaption
          className={styles.legend}
          data-testid="RoomImpressions-figcaption"
        >
          <ul
            className={styles.list}
            data-testid="RoomImpressions-figcaption-list"
          >
            <li className={styles.listItem}>{t('roomImpression.great')}</li>
            <li className={styles.listItem}>{t('roomImpression.good')}</li>
            <li className={styles.listItem}>
              {t('roomImpression.satisfactory')}
            </li>
            <li className={styles.listItem}>
              {t('roomImpression.disappointed')}
            </li>
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};

export type { Props };
export { RoomImpressions };
