import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

export const useAuth = () => {
  const loginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(); // Get the ID token
      
      // Send the ID token to the server for verification
      const response = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { idToken },
      });

      if (response.status.value == 'success') {
        localStorage.setItem('authToken', idToken);
        return { success: true };
      } else {
        return { success: false, message: response.data.value.message };
      }

    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return { loginWithGoogle };
};
