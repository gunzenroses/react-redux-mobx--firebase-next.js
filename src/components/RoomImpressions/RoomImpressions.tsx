import { FC } from 'react';

import styles from './RoomImpressions.module.scss';

type Props = {
  great: number;
  good: number;
  ok: number;
  crap: number;
};

const RoomImpressions: FC<Props> = ({
  great,
  good,
  ok,
  crap
}) => {
  const votes = [great, good, ok, crap];
  const sum = Object.values(votes).reduce((acc, curr) => acc + curr);
  const fullCircle = 100;
  let dashoffset = 0;

  return (
    <div>
      <h3 className={styles.title}>Впечатления от номера</h3>
      <figure className={styles.figure}>
        <svg
          className={styles.chart}
          width="123px"
          height="124px"
          viewBox="0 0 34 34"
        >
          <linearGradient id="gradient1" x1="50%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#FFE39C" />
            <stop offset="100%" stopColor="#FFBA9C" />
          </linearGradient>
          <linearGradient id="gradient2">
            <stop offset="0%" stopColor="#6FCF97" />
            <stop offset="100%" stopColor="#66D2EA" />
          </linearGradient>
          <linearGradient id="gradient3">
            <stop offset="0%" stopColor="#BC9CFF" />
            <stop offset="100%" stopColor="#8BA4F9" />
          </linearGradient>
          <linearGradient id="gradient4">
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
          <g className={styles.text}>
            <text className={styles.sum} x="-51%" y="-52%">
              {sum}
            </text>
            <text className={styles.votes} x="-51%" y="-37%">
              голосов
            </text>
          </g>
        </svg>
        <figcaption className={styles.legend}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Великолепно</li>
            <li className={styles.listItem}>Хорошо</li>
            <li className={styles.listItem}>Удовлетворительно</li>
            <li className={styles.listItem}>Разочарован</li>
          </ul>
        </figcaption>
      </figure>
    </div>
  );
};

export type { Props };
export { RoomImpressions };
