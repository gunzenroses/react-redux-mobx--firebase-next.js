/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { doc, setDoc, getFirestore } from 'firebase/firestore';

import { fireApp } from './firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = getFirestore(fireApp);

function populateJson(rooms: Room[]) {
  rooms.forEach((room) => {
    const srcUrl = `https://firebasestorage.googleapis.com/v0/b/toxin-hotel-crabs.appspot.com/o/rooms%2Froom-${room.id}.jpg?alt=media&token=43bbc6bb-a9a8-4731-ba0e-89784af2195e`;
    try {
      setDoc(doc(db, 'rooms', String(room.id)), {
        id: room.id,
        imgSrc: [srcUrl, srcUrl, srcUrl, srcUrl],
        number: room.number,
        type: room.type,
        rating: room.rating,
        price: room.price,
        reviewsAmount: room.reviewsAmount,
      });
    } catch (e) {
      console.error(e);
    }
  });
}

fs.readFile(path.resolve(__dirname, 'rooms.json'), (err, data) => {
  if (err) {
    console.error('No such directory or file found');
  } else if (data) {
    const { rooms } = JSON.parse(data.toString());
    populateJson(rooms);
  }
});
