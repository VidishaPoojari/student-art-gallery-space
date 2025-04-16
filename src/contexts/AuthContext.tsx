
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Register a new user
  const register = async (email: string, password: string, name: string, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        name,
        role,
        createdAt: new Date().toISOString()
      });
      
      // Set local storage items to persist auth state
      localStorage.setItem('userRole', role);
      
      toast({
        title: "Registration successful!",
        description: `You've registered as a ${role === 'student' ? 'Student Artist' : 'Visitor'}.`,
      });
      
      return;
    } catch (error: any) {
      console.error('Error registering user:', error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Log in a user
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful",
        description: "You are now logged in",
      });
    } catch (error: any) {
      console.error('Error logging in:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Log out a user
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear local storage on logout
      localStorage.removeItem('userRole');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            setUserRole(role);
            // Update local storage with user role
            localStorage.setItem('userRole', role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setUserRole(null);
        // Clear local storage when no user is found
        localStorage.removeItem('userRole');
      }
      
      setLoading(false);
    });

    // Try to get user role from local storage on initial load
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
