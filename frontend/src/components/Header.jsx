import headerLogo from "../icons/mesto_logo-white.svg";
import {Link, useLocation } from 'react-router-dom';
import AuthUserInfo from './AuthUserInfo';

const Header = ({email, onSignOut, loggedIn}) => {

  const currentPath = useLocation();
  const path = currentPath.pathname.includes('/sign-in') ? '/sign-up' : 'sign-in';
  const action = currentPath.pathname.includes('/sign-in')? 'Регистрация' : 'Войти';

  return (
    <header className="header page__header">
      <div className='header__container'>
        <img
          src={headerLogo}
          alt="Логотип приложения mesto"
          className="header__logo"
        />
        {loggedIn
          ? (
            <>
              <AuthUserInfo email={email} onSignOut={onSignOut}/>
            </>
          )
          : (<Link to={path} className="header__link">{action}</Link>)
        }
      </div>
    </header>

  );
};

export default Header;
