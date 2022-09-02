import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import mainPic from 'assets/images/room-details/roomPhotoBig.jpg';
import topPic from 'assets/images/room-details/roomPhotoTop.jpg';
import bottomPic from 'assets/images/room-details/roomPhotoBottom.jpg';

import styles from './RoomGallery.module.scss';

const defaultImg = {
  main: mainPic,
  top: topPic,
  bottom: bottomPic,
}

type Prop = {
  images?: {
    main: string;
    top: string;
    bottom: string;
  };
};

const RoomGallery: FC<Prop> = ({ images = defaultImg }) => {
  return (
    <div className={styles.roomGallery}>
      <Carousel
        className={styles.roomGallery__carousel}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        dynamicHeight
      >
        <img
          src={images.main}
          alt="bedroom"
          className={styles.roomGallery__carouselPhoto}
        />
        <img
          src={images.top}
          alt="living room"
          className={styles.roomGallery__carouselPhoto}
        />
        <img
          src={images.bottom}
          alt="main hall"
          className={styles.roomGallery__carouselPhoto}
        />
      </Carousel>
      <img
        className={styles.roomGallery__mainPhoto}
        src={images.main}
        alt="bedroom"
      />
      <div className={styles.roomGallery__smallPhotos}>
        <img
          className={styles.roomGallery__topPhoto}
          src={images.top}
          alt="living room"
        />
        <img
          className={styles.roomGallery__bottomPhoto}
          src={images.bottom}
          alt="main hall"
        />
      </div>
    </div>
  );
};

export { RoomGallery };
