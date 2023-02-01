import UserAuth from './UserAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({onRegistration}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (evt) => {
    evt.preventDefault();
    onRegistration({password: password, email: email});
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  }

  return (
    <div className='authorization page__content'>
      <div className='authorization__container'>
        <UserAuth
          title='Регистрация'
          buttonText="Зарегистрироваться"
          onSubmit={submit}
        >
          <input
            type='email'
            name="email"
            className='authorization__form-email authorization__input'
            value={email || ''}
            placeholder="email"
            onChange={handleChangeEmail}
            required
          />

          <input
            type='password'
            name="password"
            className="authorization__form-password authorization__input"
            value={password || ''}
            placeholder="Пароль"
            onChange={handleChangePassword}
            required
          />
        </UserAuth>
        <div className='authorization__route'>
          <p className='authorization__route-text'>Уже зарегистрированы?&nbsp;
            <Link to={'/sing-in'} className='authorization__link'>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Register;
