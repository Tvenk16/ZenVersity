// src/components/DeadlineTracker.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DeadlineTracker = ({ userId = 'demoUser' }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const categories = [
    'College Applications',
    'Essays',
    'Scholarships',
    'Transcripts',
    'Recommendation Letters',
    'Standardized Tests',
    'School Assignments',
    'Personal Tasks',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#10b981', emoji: '🟢' },
    { value: 'medium', label: 'Medium', color: '#f59e0b', emoji: '🟡' },
    { value: 'high', label: 'High', color: '#ef4444', emoji: '🔴' }
  ];

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'deadlines'),
      where('userId', '==', userId),
      orderBy('dueDate', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId || !taskName.trim() || !dueDate || !category) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'deadlines'), {
        userId,
        taskName: taskName.trim(),
        dueDate,
        category,
        priority,
        completed: false,
        timestamp: new Date(),
        createdDate: new Date().toDateString()
      });
      
      // Reset form
      setTaskName('');
      setDueDate('');
      setCategory('');
      setPriority('medium');
    } catch (error) {
      console.error('Error saving task:', error);
    }
    setLoading(false);
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'deadlines', taskId), {
        completed: !currentStatus,
        completedDate: !currentStatus ? new Date().toDateString() : null
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDoc(doc(db, 'deadlines', taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil) => {
    if (daysUntil < 0) return '#ef4444'; // Red - overdue
    if (daysUntil <= 3) return '#f59e0b'; // Orange - urgent
    if (daysUntil <= 7) return '#eab308'; // Yellow - soon
    return '#10b981'; // Green - plenty of time
  };

  const getUrgencyLabel = (daysUntil) => {
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    if (daysUntil === 0) return 'Due today!';
    if (daysUntil === 1) return 'Due tomorrow';
    return `${daysUntil} days left`;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'urgent') {
      const daysUntil = getDaysUntilDue(task.dueDate);
      return !task.completed && daysUntil <= 3;
    }
    return true;
  });

  const getPriorityInfo = (priorityValue) => {
    return priorities.find(p => p.value === priorityValue) || priorities[1];
  };

  return (
    <div className="deadline-tracker bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Deadline Tracker 📅</h2>
      <div className="add-task-form mb-4">
        <h3 className="font-semibold mb-2">Add New Task or Deadline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name (e.g., Submit UC application)"
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded"
            min={new Date().toISOString().split('T')[0]}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded"
          >
            {priorities.map(p => (
              <option key={p.value} value={p.value}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !taskName.trim() || !dueDate || !category}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <div className="tasks-overview mb-4">
        <h3 className="font-semibold mb-2">Your Tasks Overview</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-100 rounded p-2 text-center">
            <h4 className="font-bold">Total Tasks</h4>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </div>
          <div className="bg-yellow-100 rounded p-2 text-center">
            <h4 className="font-bold">Pending</h4>
            <div className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</div>
          </div>
          <div className="bg-green-100 rounded p-2 text-center">
            <h4 className="font-bold">Completed</h4>
            <div className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</div>
          </div>
          <div className="bg-red-100 rounded p-2 text-center">
            <h4 className="font-bold">Urgent</h4>
            <div className="text-2xl font-bold">
              {tasks.filter(t => !t.completed && getDaysUntilDue(t.dueDate) <= 3).length}
            </div>
          </div>
        </div>
      </div>
      <div className="tasks-filter mb-4">
        <h3 className="font-semibold mb-2">Filter Tasks</h3>
        <div className="flex gap-2 mb-2">
          {[
            { key: 'all', label: '📋 All Tasks' },
            { key: 'pending', label: '⏳ Pending' },
            { key: 'urgent', label: '🚨 Urgent' },
            { key: 'completed', label: '✅ Completed' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-2 py-1 rounded border ${filter === filterOption.key ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 text-center">
            <p>📝 No tasks found. {filter === 'all' ? 'Add your first task above!' : `Try changing the filter.`}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredTasks.map((task) => {
              const daysUntil = getDaysUntilDue(task.dueDate);
              const urgencyColor = getUrgencyColor(daysUntil);
              const priorityInfo = getPriorityInfo(task.priority);
              return (
                <div key={task.id} className={`bg-gray-100 rounded p-2 mb-1 flex flex-col md:flex-row md:items-center md:justify-between ${task.completed ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id, task.completed)}
                      className="accent-blue-500"
                    />
                    <div>
                      <h4 className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.taskName}</h4>
                      <div className="flex gap-2 text-xs">
                        <span className="text-gray-600">📂 {task.category}</span>
                        <span style={{ color: priorityInfo.color }}>{priorityInfo.emoji} {priorityInfo.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-1 mt-2 md:mt-0">
                    <div className="text-xs text-gray-600">📅 Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    {!task.completed && (
                      <div className="font-bold text-xs" style={{ color: urgencyColor }}>
                        {getUrgencyLabel(daysUntil)}
                      </div>
                    )}
                    {task.completed && (
                      <div className="text-green-600 text-xs font-bold">
                        ✅ Completed on {task.completedDate}
                      </div>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 text-xs mt-1"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlineTracker;
