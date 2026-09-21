import { useState, useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const USERS_KEY = "addis-eats-users";
const SESSION_KEY = "addis-eats-current-user";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On first load, restore whoever was signed in last time.
  useEffect(() => {
    const savedEmail = localStorage.getItem(SESSION_KEY);
    if (savedEmail) {
      const users = loadUsers();
      const found = users.find((u) => u.email === savedEmail);
      if (found) setUser({ fullName: found.fullName, email: found.email });
    }
  }, []);

  const signUp = ({ fullName, email, password }) => {
    const users = loadUsers();

    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const newUser = { fullName, email, password };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, email);
    setUser({ fullName, email });
    return { ok: true };
  };

  const signIn = ({ email, password }) => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { ok: false, error: "Incorrect email or password." };
    }

    localStorage.setItem(SESSION_KEY, email);
    setUser({ fullName: found.fullName, email: found.email });
    return { ok: true };
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signUp,
      signIn,
      signOut,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;