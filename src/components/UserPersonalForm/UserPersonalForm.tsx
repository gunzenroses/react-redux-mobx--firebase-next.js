import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { useAppDispatch } from 'hooks/hooks';
import { updateUser } from 'redux/thunks/users';

import { UserPersonalItem } from './UserPersonalItem/UserPersonalItem';
import { itemList } from './constans';
import styles from './UserPersonalForm.module.scss';

type Props = {
  personalData: UserType;
};

const UserPersonalForm: FC<Props> = ({ personalData }) => {
  const dispatch = useAppDispatch();
  const handleAcceptNameButtonCLick = (newPersonalData: PersonalFormData) => {
    dispatch(
      updateUser({
        user: personalData.id,
        personalData: newPersonalData,
      })
    );
  };
  const { t } = useTranslation('user-page');

  const getBirthday = (): string => {
    return personalData.birthday
      ? JSON.parse(personalData.birthday).seconds
      : new Date().getMilliseconds();
  };

  const getValue = (key: keyof UserType | 'password'): string => {
    switch (key) {
      case 'password':
        return '*******';
      case 'birthday':
        return getBirthday();
      case 'getSpecOffers':
        return '';
      case 'likes':
        return '';
      default:
        return personalData[key];
    }
  };

  return (
    <div className={styles.userPersonalForm}>
      <h2 className={styles.userPersonalForm__title}>{t('yourData')}</h2>
      <div className={styles.userPersonalForm__content}>
        {itemList.map(({ key, label }) => {
          return (
            <div className={styles.userPersonalForm__itemWrapper} key={key}>
              <UserPersonalItem
                item={{ key, value: getValue(key) }}
                label={key}
                onAcceptButtonClick={handleAcceptNameButtonCLick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { UserPersonalForm };
