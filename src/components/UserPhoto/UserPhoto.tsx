import {FaUserCircle} from "react-icons/fa";

import styles from './UserPhoto.module.scss';

const UserPhoto = () => {
  return (
    <button type="button" className={styles.userPhoto}>
      <FaUserCircle className={styles.userPhoto__default}/>
    </button>
  );
};

export {UserPhoto};