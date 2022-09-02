import LandingForm from './LandingForm/LandingForm';
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <div>
      <main className={styles.landing}>
        <div className={styles.landing__inner}>
          <LandingForm />
          <span className={styles.landing__text}>
            Лучшие номера для вашей работы, отдыха и просто вдохновения
          </span>
        </div>
      </main>
    </div>
  );
};

export { Landing };
