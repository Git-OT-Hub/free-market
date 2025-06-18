import { useState } from 'react';
import http from '../../lib/axios';

type User = {
    name: string,
    email: string,
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const login = () => {
    http.get('/sanctum/csrf-cookie').then(() => {
        http.post('/api/login', {email, password}).then((res) => {
          console.log(res);

          setTimeout(() => {
            http.get('/api/user').then((res) => {
              console.log(res);
            }).catch((err) => {
              console.error('user fetch failed', err);
            });
          }, 300);
        });
    });
  }
  const logout = () => {
    http.get('/sanctum/csrf-cookie').then(() => {
      http.post('/api/logout').then((res) => {
          console.log(res);
      });
    });
  }
  const getUsers = () => {
    http.get('/api/users').then((res) => {
      console.log(res);
      setUsers(res.data);
    });
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
