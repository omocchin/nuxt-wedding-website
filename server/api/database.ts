import { defineEventHandler } from 'h3';
import { getFirebaseDatabase } from '~/server/utils/firebaseAdmin';

export default defineEventHandler(async (event) => {
  const db = getFirebaseDatabase();
  const body = await readBody(event);
  const ref = db.ref(body.path);

  if (event.method == 'POST') {
    const newRef = await ref.push(body.data);
    const newKey = newRef.key
    const createdData = await newRef.once('value');
    const newData = createdData.val()
    return { key: newKey, data: newData };
  } else if (event.method == 'DELETE') {
    const data = await ref.remove()
    return {data: data}
  }
});
