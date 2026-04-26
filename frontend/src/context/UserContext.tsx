import { createContext, useContext, useEffect, useState } from 'react';
import type React from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

export interface UserMetrics {
  totalXP: number;
  currentStreak: number;
  tasksCompleted: number;
  co2Saved: number;
}

interface UserContextType {
  metrics: UserMetrics;
  updateMetrics: (xpEarned: number, tasksAdded: number, co2Added: number) => Promise<void>;
  loading: boolean;
}

const defaultMetrics: UserMetrics = {
  totalXP: 0,
  currentStreak: 0,
  tasksCompleted: 0,
  co2Saved: 0
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [metrics, setMetrics] = useState<UserMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      if (!currentUser) {
        setMetrics(defaultMetrics);
        setLoading(false);
        return;
      }
      
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (isMounted) {
            setMetrics({
              totalXP: data.totalXP || 0,
              currentStreak: data.currentStreak || 0,
              tasksCompleted: data.tasksCompleted || 0,
              co2Saved: data.co2Saved || 0
            });
          }
        } else {
          await setDoc(userRef, defaultMetrics);
          if (isMounted) setMetrics(defaultMetrics);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();
    return () => { isMounted = false; };
  }, [currentUser]);

  const updateMetrics = async (xpEarned: number, tasksAdded: number, co2Added: number) => {
    if (!currentUser) return;
    
    const newMetrics = {
      totalXP: metrics.totalXP + xpEarned,
      currentStreak: metrics.currentStreak, 
      tasksCompleted: metrics.tasksCompleted + tasksAdded,
      co2Saved: metrics.co2Saved + co2Added
    };
    
    setMetrics(newMetrics);
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, newMetrics);
    } catch (error) {
      console.error("Error updating user metrics:", error);
    }
  };

  return (
    <UserContext.Provider value={{ metrics, updateMetrics, loading }}>
      {children}
    </UserContext.Provider>
  );
};
