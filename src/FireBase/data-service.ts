// src/Firebase/data-service.ts
import { database } from './firebase-config';
import { ref, get, child } from 'firebase/database';

async function getData(path: string) {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Métodos específicos por cada dataset:

export function getWesternAnimation() {
  return getData('Western-Animation');
}

export function get3DAnimation() {
  return getData('3d-animation');
}

export function getStopMotion() {
  return getData('Stop-Motion');
}

export function getDisney() {
  return getData('disney');
}

export function getDonghua() {
  return getData('donghua');
}

export function getPostList() {
  return getData('postList');
}

export function getCommentList() {
  return getData('commentList');
}
