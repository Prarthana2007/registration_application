const USERS_KEY = 'studentConnectUsers';
const SESSION_KEY = 'studentConnectSession';

export function hashPassword(password) {
  let hash = 0;

  for (let i = 0; i < password.length; i += 1) {
    hash = (hash * 31 + password.charCodeAt(i)) >>> 0;
  }

  return hash.toString(16);
}

export function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error('Could not read registered users:', error);
    return [];
  }
}

export function saveUser(user) {
  try {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Could not save user:', error);
    return false;
  }
}

export function findUser(identifier) {
  const users = getUsers();
  const searchValue = String(identifier || '').trim().toLowerCase();

  return (
    users.find(
      (user) =>
        user.email?.toLowerCase() === searchValue || user.username?.toLowerCase() === searchValue,
    ) ?? null
  );
}

export function saveSession(user) {
  try {
    const sessionData = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    return true;
  } catch (error) {
    console.error('Could not save session:', error);
    return false;
  }
}

export function getSession() {
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Could not read session:', error);
    clearSession();
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    return true;
  } catch (error) {
    console.error('Could not clear session:', error);
    return false;
  }
}
