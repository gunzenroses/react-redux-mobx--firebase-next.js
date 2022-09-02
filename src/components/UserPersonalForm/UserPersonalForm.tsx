import { FC } from 'react';

import { useMobxStore } from 'hooks/hooks';

import { UserPersonalItem } from './UserPersonalItem/UserPersonalItem';
import { itemList } from './constans';
import styles from './UserPersonalForm.module.scss';

type Props = {
  personalData: UserStateType;
};

const UserPersonalForm: FC<Props> = ({ personalData }) => {
  const { userStore } = useMobxStore();

  const handleAcceptNameButtonCLick = (newPersonalData: PersonalFormData) => {
    userStore.updateUser({
        id: personalData.id,
        data: newPersonalData,
      });
  };

  const getBirthday = (): string => {
    return personalData.birthday
      ? JSON.parse(personalData.birthday).seconds
      : new Date().getMilliseconds();
  };

  const getValue = (key: keyof UserStateType | 'password'): string => {
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
      <h2 className={styles.userPersonalForm__title}>
        Ваши персональные данные:
      </h2>
      <div className={styles.userPersonalForm__content}>
        {itemList.map(({ key, label }) => {
          return (
            <div className={styles.userPersonalForm__itemWrapper} key={String(key)}>
              <UserPersonalItem
                item={{ key, value: getValue(key) }}
                label={label}
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
