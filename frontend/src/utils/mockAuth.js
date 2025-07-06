// Default accounts untuk demo
const defaultAccounts = [
  { email: 'admin@ecotracker.com', password: 'admin123', uid: 'admin-001', role: 'admin' },
  { email: 'user@ecotracker.com', password: 'user123', uid: 'user-001', role: 'user' },
  { email: 'demo@example.com', password: '123456', uid: 'demo-user-123', role: 'user' }
];

// Mock authentication untuk development tanpa Firebase
export const mockAuth = {
  currentUser: JSON.parse(localStorage.getItem('mockUser')) || null,
  signInWithEmailAndPassword: async (email, password) => {
    const account = defaultAccounts.find(acc => acc.email === email && acc.password === password);
    if (account) {
      mockAuth.currentUser = { email: account.email, uid: account.uid, role: account.role };
      localStorage.setItem('mockUser', JSON.stringify(mockAuth.currentUser));
      return { user: mockAuth.currentUser };
    }
    throw new Error('Invalid email or password');
  },
  createUserWithEmailAndPassword: async (email, password) => {
    const existingAccount = defaultAccounts.find(acc => acc.email === email);
    if (existingAccount) {
      throw new Error('Email already in use');
    }
    if (email && password) {
      const newUser = { email, uid: `user-${Date.now()}`, role: 'user' };
      defaultAccounts.push({ ...newUser, password });
      mockAuth.currentUser = newUser;
      return { user: mockAuth.currentUser };
    }
    throw new Error('Registration failed');
  },
  signOut: async () => {
    mockAuth.currentUser = null;
    localStorage.removeItem('mockUser');
  },
  onAuthStateChanged: (callback) => {
    callback(mockAuth.currentUser);
    return () => {}; // unsubscribe function
  }
};

export { defaultAccounts };