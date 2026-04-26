import { useState } from 'react';
import type React from 'react';
import { Star, CheckCircle, Upload } from 'lucide-react';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string, proof: string) => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700'
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const [proofText, setProofText] = useState('');

  const handleComplete = () => {
    if (!task.completed) {
      if (!expanded) {
        setExpanded(true);
      } else if (proofText.trim()) {
        onComplete(task.id, proofText);
      }
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border shadow-sm flex flex-col transition-colors group ${task.completed ? 'border-green-300 bg-green-50/30 opacity-75' : 'border-green-50 hover:border-green-200'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{task.emoji}</div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${difficultyColors[task.difficulty]}`}>
            {task.difficulty}
          </span>
          <div className={`flex items-center px-2 py-1 rounded-md text-xs font-bold ${task.completed ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700'}`}>
            <Star className={`w-3 h-3 mr-1 ${task.completed ? 'fill-gray-400 text-gray-400' : 'fill-green-500 text-green-500'}`} />
            +{task.xp} XP
          </div>
        </div>
      </div>
      
      <h4 className={`text-lg font-bold mb-2 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
        {task.title}
      </h4>
      <p className={`text-sm mb-6 flex-1 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
        {task.desc}
      </p>

      {task.completed ? (
        <div className="w-full bg-green-100 text-green-700 font-semibold py-2.5 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Completed
        </div>
      ) : (
        <>
          {expanded && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Provide Proof (Required)</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-green-500 focus:border-green-500 outline-none"
                rows={3}
                placeholder="What did you do? Describe your action..."
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
              ></textarea>
            </div>
          )}
          
          <button 
            onClick={handleComplete}
            disabled={expanded && !proofText.trim()}
            className="w-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {expanded ? (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit & Complete
              </>
            ) : (
              'Mark Complete'
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default TaskCard;
