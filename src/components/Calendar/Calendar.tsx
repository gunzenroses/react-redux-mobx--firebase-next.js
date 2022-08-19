import { FC, useEffect, useMemo, useRef, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';
import localeRu from 'air-datepicker/locale/ru';
import { MdExpandMore, MdArrowForward, MdArrowBack } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import styles from './Calendar.module.scss';

type Props = {
  mode: 'single' | 'twin';
  selectedDates?: FreeDays;
  onSelectedDate?: (date: Date[]) => void;
};

const Calendar: FC<Props> = ({
  mode,
  selectedDates,
  onSelectedDate = () => {},
}) => {
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const dpContainer = useRef(null);
  const datePicker = useRef<AirDatepicker>();
  const forwardIcon = ReactDOMServer.renderToString(<MdArrowForward />);
  const backIcon = ReactDOMServer.renderToString(<MdArrowBack />);
  const { t } = useTranslation('calendar');
  const { locale } = useRouter();

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
            return t('btnClear');
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
            return t('btnApply');
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
  }, [backIcon, forwardIcon, onSelectedDate, t]);

  const wrapDispatchCallback = useCallback(
    (date: Date | Date[]) => {
      const isTwoDates = Array.isArray(date) && date.length === 2;
      if (isTwoDates && onSelectedDate) {
        onSelectedDate(date);
      }
    },
    [onSelectedDate]
  );

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

  const selectDates = (dates: FreeDays) => {
    if (dates.from && dates.to && datePicker.current) {
      datePicker.current.selectDate([new Date(dates.from), new Date(dates.to)]);
    }
  };

  useEffect(() => {
    new Promise((resolve) => {
      if (firstInput.current && dpContainer.current) {
        resolve(
          (datePicker.current =
            mode === 'single'
              ? createSingle(firstInput.current, dpContainer.current)
              : createTwin(firstInput.current, dpContainer.current))
        );
      }
    }).then(() => {
      if (selectedDates) {
        selectDates(selectedDates);
      }
    });
    return () => datePicker.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    datePicker.current?.update({
      locale: locale === 'ru' ? localeRu : localeEn,
    });
  }, [locale]);

  const firstInputLabel =
    mode === 'twin' ? t('labelFirstTwin') : t('labelFirstSingle');

  const firstInputPlaceholder =
    mode === 'twin' ? t('placeholderTwin') : t('placeholderSingle');

  return (
    <div className={styles.calendar}>
      <div className={styles.wrapper} ref={dpContainer}>
        <label className={styles.label}>
          {firstInputLabel}
          <input
            type="text"
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
            {t('labelSecond')}
            <input
              type="text"
              placeholder={t('placeholderTwin')}
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
