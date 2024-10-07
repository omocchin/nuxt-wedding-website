import { defineEventHandler, readBody } from 'h3';
import { getFirebaseAuth } from '~/server/utils/firebaseAdmin';
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();
const allowedEmails = JSON.parse(config.firebaseAuthAllowedEmails)

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const idToken = body.idToken;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await getFirebaseAuth().verifyIdToken(idToken);
    const userEmail = decodedToken.email;

    // Check if the email is in the allowed list
    if (allowedEmails.includes(userEmail)) {
      // Optionally, create a session cookie for persistent login
      const sessionCookie = await getFirebaseAuth().createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 5 * 1000, // Set cookie to expire in 5 days
      });

      // Set the session cookie in the response header (secure cookie)
      event.res.setHeader('Set-Cookie', `session=${sessionCookie}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 5}`);

      return { status: 'success', user: decodedToken };
    } else {
      return { status: 'error', message: 'Unauthorized email' };
    }
  } catch (error) {
    return { status: 'error', message: 'Invalid ID token or unauthorized access' };
  }
});
