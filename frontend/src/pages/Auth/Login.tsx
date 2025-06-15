import { useState } from 'react';
import axios from 'axios';

type User = {
    name: string,
    email: string,
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const http = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  const login = () => {
    http.get('/sanctum/csrf-cookie', { withCredentials: true }).then(() => {
        http.post('/api/login', {email, password}, { withCredentials: true }).then((res) => {
            console.log(res.data);
        });
    });
  }
  const logout = () => {
    http.post('/api/logout').then((res) => {
        console.log(res);
    });
  }
  const getUsers = () => {
    axios.get('/api/users').then((res) => {
      setUsers(res.data);
    })
  }
  const reset = () => {setUsers([])}
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className="App">
      <nav>
        <button onClick={login}>ログイン</button>
        <button onClick={logout}>ログアウト</button>
        <button onClick={getUsers}>User 一覧</button>
        <button onClick={reset}>リセット</button>
      </nav>
        <br />
      <div>
        <label>email</label>
        <input type="text" value={email} onChange={onChangeEmail}/>
        <label>password</label>
        <input type="password" value={password} onChange={onChangePassword}/>
      </div>
      <div>
        {
          users.map((user) => {
            return (
              <p key={user.email}>{user.name}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default Login;
