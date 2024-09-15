import { sendGridEmail } from '~/server/services/sendGridEmail';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await sendGridEmail(body);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to send email', error };
  }
});
