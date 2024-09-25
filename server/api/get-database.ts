import { getQuery } from 'h3';
import { getFirebaseDatabase } from '~/server/utils/firebaseAdmin';

export default defineEventHandler(async (event) => {
  const db = getFirebaseDatabase();
  const query: any = getQuery(event);
  const ref = db.ref(query.path);

  const data = await ref.once('value')

  return {
    data: data,
    message: 'Data fetched successfully'
  };
});