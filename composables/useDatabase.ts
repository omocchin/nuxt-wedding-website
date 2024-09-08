import { ref, push, remove } from 'firebase/database';
import { useNuxtApp } from '#app';

export const useFirebaseActions = () => {
  const { $database } = useNuxtApp();

  const addItemWithUniqueId = (path: string, data: any) => {
    const dbRef = ref($database, path);
    return push(dbRef, data);
  };

  const deleteDataFromFirebase = (path: string) => {
    const dbRef = ref($database, path);
    return remove(dbRef);
  };

  return { addItemWithUniqueId, deleteDataFromFirebase };
};