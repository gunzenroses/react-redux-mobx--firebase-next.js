import {FC, useEffect} from 'react';
import classnames from 'classnames';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from './Calculation.module.scss';

type Props = {
  price?: number;
  discount?: number;
  serviceCharge?: number;
  additionalFees?: number;
  days: number;
  countCost: (cost: number) => void;
};

const Calculation: FC<Props> = ({
  price = 9990,
  discount = 2179,
  serviceCharge = 0,
  additionalFees = 300,
  days = 4,
  countCost,
}) => {
  const totalCost = (): number => {
    let cost = price * days;
    if (cost > 0) cost += serviceCharge + additionalFees
    return cost >= discount ? cost - discount : cost;
  };
  const totalCostValue = totalCost();
  
  useEffect(() => {
    countCost(totalCostValue)
  }, [countCost, totalCostValue])

  return (
    <div className={styles.calculation}>
      <div className={styles.calculation__inner}>
        <div
          className={classnames([styles.calculation__row], {
            [styles.calculation__row_withoutInfo]: true,
          })}
        >
          <div className={styles.calculation__daysPriceText}>
            {price.toLocaleString()}₽ х {days} суток
          </div>
          <div className={styles.calculation__cost}>
            {(price * days).toLocaleString()}₽
          </div>
        </div>
        <div className={styles.calculation__row}>
          <div className={styles.calculation__serviceText}>
            Сбор за услуги
            {discount ? `: скидка  ${discount.toLocaleString()}₽` : ''}
          </div>
          <Popup
            trigger={
              <button type="button" className={styles.calculation__info}>
                i
              </button>
            }
          >
            <div className={styles.calculation__infoText}>
              Предоставляется при бронировании до конца месяца
            </div>
          </Popup>
          <div className={styles.calculation__cost}>
            {serviceCharge.toLocaleString()}₽
          </div>
        </div>
        <div className={styles.calculation__row}>
          <div className={styles.calculation__additionalText}>
            Сбор за дополнительные услуги
          </div>
          <Popup
            trigger={
              <button type="button" className={styles.calculation__info}>
                i
              </button>
            }
          >
            <div className={styles.calculation__infoText}>
              Включает в себя обязательное страхование
            </div>
          </Popup>
          <div className={styles.calculation__cost}>{additionalFees}₽</div>
        </div>
      </div>
      <div className={styles.calculation__total}>
        <div className={styles.calculation__totalText}>Итого</div>
        <div className={styles.calculation__totalDots}> </div>
        <div className={styles.calculation__totalCost}>
          {totalCostValue.toLocaleString()}₽
        </div>
      </div>
    </div>
  );
};

export { Calculation };
