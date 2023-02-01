import { Redirect, Route } from 'react-router-dom';

/**
 * Компонент защищает роутинг от переходов в эндпоинты без авторизации
 * @param {React.Component} Component
 * @param {Object} props
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({component: Component, ...props}) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
    </Route>
  )
};

export default ProtectedRoute;
