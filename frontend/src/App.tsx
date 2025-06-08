import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // APIからタスク一覧を取得
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('タスクの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>タスク一覧</h1>
      </header>
      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;