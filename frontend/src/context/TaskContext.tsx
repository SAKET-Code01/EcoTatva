import { createContext, useContext, useEffect, useState } from 'react';
import type React from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Task } from '../types/task';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  completeTask: (taskId: string, proof: string) => Promise<void>;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Unplug Standby Electronics', desc: 'Unplug at least 3 devices not in use to save phantom energy.', emoji: '🔌', difficulty: 'Easy', xp: 15, completed: false },
  { id: '2', title: 'Zero Waste Lunch', desc: 'Pack your lunch in reusable containers without any single-use plastic.', emoji: '🍱', difficulty: 'Medium', xp: 25, completed: false },
  { id: '3', title: 'Meatless Meal', desc: 'Have a completely vegetarian or vegan meal for dinner.', emoji: '🥦', difficulty: 'Hard', xp: 50, completed: false },
];

const TaskContext = createContext<TaskContextType | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const { updateMetrics } = useUser();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadTasks = async () => {
      if (!currentUser) {
        setTasks(initialTasks);
        setLoading(false);
        return;
      }
      
      try {
        const today = new Date().toISOString().split('T')[0];
        const dailyTasksRef = doc(db, 'users', currentUser.uid, 'dailyTasks', today);
        const dailySnap = await getDoc(dailyTasksRef);
        
        let completedData: Record<string, { proof: string }> = {};
        
        if (dailySnap.exists()) {
          completedData = dailySnap.data().completed || {};
        }
        
        if (isMounted) {
          setTasks(initialTasks.map(t => ({
            ...t,
            completed: !!completedData[t.id],
            proof: completedData[t.id]?.proof || ''
          })));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTasks();
    return () => { isMounted = false; };
  }, [currentUser]);

  const completeTask = async (taskId: string, proof: string) => {
    if (!currentUser) return;
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1 || tasks[taskIndex].completed) return;
    
    const task = tasks[taskIndex];
    
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true, proof } : t));
    
    await updateMetrics(task.xp, 1, 0.5);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const dailyTasksRef = doc(db, 'users', currentUser.uid, 'dailyTasks', today);
      
      const snap = await getDoc(dailyTasksRef);
      if (snap.exists()) {
        await updateDoc(dailyTasksRef, {
          [`completed.${taskId}`]: { proof, completedAt: new Date().toISOString() }
        });
      } else {
        await setDoc(dailyTasksRef, {
          completed: {
            [taskId]: { proof, completedAt: new Date().toISOString() }
          }
        });
      }
    } catch (error) {
      console.error("Error saving task completion:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
