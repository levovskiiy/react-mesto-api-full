const AuthUserInfo = ({email, onSignOut}) => {
  return (
    <div className='authUserInfo'>
      <span className='authUserInfo__email'>{email}</span>
      <button className='authUserInfo__link' onClick={onSignOut}>Выйти</button>
    </div>
  );
}

export default AuthUserInfo;
