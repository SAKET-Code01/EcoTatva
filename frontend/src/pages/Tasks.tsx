import { useState } from 'react';
import TaskCard from '../components/tasks/TaskCard';
import { CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
  const { metrics, loading: userLoading } = useUser();
  const { tasks, completeTask, loading: tasksLoading } = useTasks();
  const [successMsg, setSuccessMsg] = useState('');

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  if (userLoading || tasksLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="animate-pulse text-green-600 font-semibold text-lg">Loading Tasks...</div>
      </div>
    );
  }

  const handleCompleteWrapper = async (taskId: string, proof: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      await completeTask(taskId, proof);
      setSuccessMsg(`Awesome! You earned ${task.xp} XP!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Today's Tasks</h2>
            <p className="text-gray-500 mt-1">{todayStr}</p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-bold border border-green-200 text-center">
            Total XP: {metrics.totalXP}
          </div>
        </div>

        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onComplete={handleCompleteWrapper} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
