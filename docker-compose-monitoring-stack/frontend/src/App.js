import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const API_URL = process.env.REACT_APP_API_BASE_URL || '';

  useEffect(() => {
    // Add /api prefix to match Nginx configuration
    fetch(`${API_URL}/api/tasks`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(error => console.error('API Error:', error));
  }, [API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add /api prefix to match Nginx configuration
    fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to add task');
      return res.json();
    })
    .then(task => {
      setTasks([...tasks, task]);
      setNewTask('');
    })
    .catch(error => console.error('Submission Error:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add</button>
      </form>
      
      <h2>Tasks:</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      
      <div>API URL: {API_URL}/api/tasks</div>  {/* Updated debug info */}
    </div>
  );
}

export default App;