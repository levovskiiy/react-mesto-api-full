import { useState } from 'react';
import UserAuth from './UserAuth';

const Login = ({onAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuth({password: password, email: email});
  }

  return (
    <div className='authorization'>
      <div className='authorization__container'>
        <UserAuth
          title='Вход'
          buttonText='Войти'
          onSubmit={handleSubmit}
        >
          <input
            className="authorization__form-email authorization__input"
            type="email"
            placeholder="email"
            name="email"
            value={email || ''}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />

          <input
            className="authorization__form-password authorization__input"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            value={password || ''}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </UserAuth>
      </div>
    </div>
  )
};

export default Login;
