import { FC, useEffect, useMemo, useRef, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { MdExpandMore, MdArrowForward, MdArrowBack } from 'react-icons/md';

import styles from './Calendar.module.scss';

type Props = {
  mode: 'single' | 'twin';
  selectedDates?: [Date, Date];
  onSelectedDate?: (date: Date[]) => void;
};

const Calendar: FC<Props> = ({ mode, selectedDates, onSelectedDate = () => {} }) => {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const dpContainer = useRef(null);
  const datePicker = useRef<AirDatepicker>();
  const forwardIcon = ReactDOMServer.renderToString(<MdArrowForward />);
  const backIcon = ReactDOMServer.renderToString(<MdArrowBack />);

  const inputHandler = () => {
    if (!datePicker.current?.$datepicker.isConnected && datePicker.current) {
      datePicker.current.show();
    }
  };

  const hideCalendar = (e: PointerEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (!target.closest('.air-datepicker') && datePicker.current) {
      datePicker.current.hide();
    }
  };

  const defaultOptions: Partial<AirDatepickerOptions> = useMemo(() => {
    return {
      prevHtml: backIcon,
      nextHtml: forwardIcon,
      range: true,
      minDate: new Date(),
      navTitles: {
        days: 'MMMM yyyy',
      },
      buttons: [
        {
          content: () => {
            return 'очистить';
          },
          onClick: (dp) => {
            dp.clear();
            onSelectedDate([]);
          },
          attrs: {
            type: 'button',
          },
        },
        {
          content: () => {
            return 'применить';
          },
          onClick: (dp) => {
            dp.hide();
          },
          attrs: {
            type: 'button',
          },
        },
      ],
      onShow: () => {
        document.addEventListener('pointerdown', hideCalendar);
      },
      onHide: () => {
        document.removeEventListener('pointerdown', hideCalendar);
      },
    };
  }, [backIcon, forwardIcon, onSelectedDate]);
  
  const wrapDispatchCallback = useCallback((date: Date | Date[]) => {
    const isTwoDates = Array.isArray(date) && date.length === 2;
    if (isTwoDates && onSelectedDate) {
      onSelectedDate(date);
    }
  }, [onSelectedDate])

  const createSingle = useCallback(
    (input: HTMLInputElement, container: HTMLElement) => {
      return new AirDatepicker(input, {
        ...defaultOptions,
        container,
        dateFormat: 'dd MMM',
        onSelect({ formattedDate, date }) {
          if (firstInput.current && Array.isArray(formattedDate)) {
            firstInput.current.value = formattedDate.join(' - ') || '';
          }
          wrapDispatchCallback(date);
        },
      });
    },
    [defaultOptions, wrapDispatchCallback]
  );

  const createTwin = useCallback(
    (input: HTMLInputElement, container: HTMLElement) => {
      return new AirDatepicker(input, {
        ...defaultOptions,
        container,
        onSelect({ formattedDate, date }) {
          if (firstInput.current && Array.isArray(formattedDate)) {
            firstInput.current.value = formattedDate[0] || '';
          }
          if (secondInput.current && Array.isArray(formattedDate)) {
            secondInput.current.value = formattedDate[1] || '';
          }
          wrapDispatchCallback(date);
        },
      });
    },
    [defaultOptions, wrapDispatchCallback]
  );

  const selectDates = (dates: [Date, Date]) => {
    datePicker.current?.selectDate(dates);
  };

  useEffect(() => {
    if (firstInput.current && dpContainer.current) {
      datePicker.current =
        mode === 'single'
          ? createSingle(firstInput.current, dpContainer.current)
          : createTwin(firstInput.current, dpContainer.current);
    }
    if (selectedDates) {
      selectDates(selectedDates);
    }
    return () => datePicker.current && datePicker.current.destroy();
  }, [createSingle, createTwin, mode, selectedDates]);

  const firstInputLabel =
    mode === 'twin' ? 'прибытие' : 'даты пребывания в отеле';

  const firstInputPlaceholder =
    mode === 'twin' ? 'ДД.ММ.ГГГГ' : 'ДД.ММ - ДД.ММ';

  return (
    <div className={styles.calendar}>
      <div className={styles.wrapper} ref={dpContainer}>
        <label className={styles.label}>
          {firstInputLabel}
          <input
            type='text'
            placeholder={firstInputPlaceholder}
            ref={firstInput}
            className={styles.input}
            readOnly
            onClick={inputHandler}
          />
          <MdExpandMore className={styles.expandIcon} />
        </label>
        {mode === 'twin' && (
          <label className={styles.label}>
            выезд
            <input
              type='text'
              placeholder='ДД.ММ.ГГГГ'
              ref={secondInput}
              className={styles.input}
              readOnly
              onClick={inputHandler}
            />
            <MdExpandMore className={styles.expandIcon} />
          </label>
        )}
      </div>
    </div>
  );
};

export { Calendar };
