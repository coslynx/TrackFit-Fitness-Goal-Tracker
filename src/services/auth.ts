import { LoginData, SignupData, UserData } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const SESSION_TOKEN_KEY = 'trackfit-session-token';

export const registerUser = async (userData: SignupData): Promise<void> => {
  try {
    const existingUsers = getLocalStorage('users') || [];
    const existingUser = existingUsers.find(
      (user: UserData) => user.email === userData.email
    );

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser: UserData = {
      id: crypto.randomUUID(),
      email: userData.email,
      password: userData.password, // Store password securely in production
      verified: false, // For email verification in a production environment
    };

    const updatedUsers = [...existingUsers, newUser];
    setLocalStorage('users', updatedUsers);
    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (loginData: LoginData): Promise<void> => {
  try {
    const users = getLocalStorage('users') || [];
    const user = users.find(
      (user: UserData) =>
        user.email === loginData.username || user.id === loginData.username
    );

    if (!user) {
      throw new Error('Invalid username or email');
    }

    // In production, compare the password with a secure hash. For MVP, we're comparing directly
    if (user.password !== loginData.password) {
      throw new Error('Incorrect password');
    }

    // For MVP, store the session token in local storage. In production, you'd typically use a database and a secure JWT token.
    setLocalStorage(SESSION_TOKEN_KEY, user.id);
    console.log('User logged in successfully!');
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    setLocalStorage(SESSION_TOKEN_KEY, null);
    console.log('User logged out successfully!');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export const isLoggedIn = (): boolean => {
  const token = getLocalStorage(SESSION_TOKEN_KEY);
  return !!token;
};

export const getCurrentUser = (): UserData | null => {
  const token = getLocalStorage(SESSION_TOKEN_KEY);
  if (token) {
    const users = getLocalStorage('users') || [];
    return users.find((user: UserData) => user.id === token) || null;
  }
  return null;
};