import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

import styles from './RoomGallery.module.scss';

type Prop = {
  roomId: number;
};

const RoomGallery: FC<Prop> = ({ roomId = 1 }) => {
  const myLoader = ({ src }: { src: string }) => {
    return `https:/firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-${src}?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e`;
  };
  return (
    <div data-testid="RoomGallery-wrapper" className={styles.roomGallery}>
      <Carousel
        className={styles.roomGallery__carousel}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        dynamicHeight
      >
        <Image
          loader={myLoader}
          src={`${roomId}.jpg`}
          alt="bedroom"
          className={styles.roomGallery__carouselPhoto}
          height={243}
          width={461}
          layout="responsive"
        />
        <Image
          loader={myLoader}
          src={`${roomId}.jpg`}
          alt="living room"
          className={styles.roomGallery__carouselPhoto}
          height={243}
          width={461}
          layout="responsive"
        />
        <Image
          loader={myLoader}
          src={`${roomId}.jpg`}
          alt="main hall"
          className={styles.roomGallery__carouselPhoto}
          height={243}
          width={461}
          layout="responsive"
        />
      </Carousel>
      <div
        data-testid="RoomGallery-photos"
        className={styles.roomGallery__photos}
      >
        <div
          data-testid="RoomGallery-bigPhoto"
          className={styles.roomGallery__bigPhoto}
        >
          <Image
            className={styles.roomGallery__mainPhoto}
            loader={myLoader}
            src={`${roomId}.jpg`}
            alt="bedroom"
            layout="fill"
            priority
          />
        </div>
        <div
          data-testid="RoomGallery-smallPhotos"
          className={styles.roomGallery__smallPhotos}
        >
          <div className={styles.roomGallery__smallPhotosItem}>
            <Image
              className={styles.roomGallery__topPhoto}
              loader={myLoader}
              src={`${roomId}.jpg`}
              alt="living room"
              layout="fill"
              priority
            />
          </div>
          <div className={styles.roomGallery__smallPhotosItem}>
            <Image
              className={styles.roomGallery__bottomPhoto}
              loader={myLoader}
              src={`${roomId}.jpg`}
              alt="main hall"
              layout="fill"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { RoomGallery };
