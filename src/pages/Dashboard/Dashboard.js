import React, { useState } from 'react';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Employee from '../../components/Employee';
import List from '../../components/List';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import style from './Dashboard.module.scss';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const { path } = useRouteMatch();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Sidebar
          handleLogout={handleLogout}
          error={error}
          currentUser={currentUser.email}
        />
        <main className={style.main}>
          <Switch>
            <PrivateRoute exact path={`${path}`} component={List} />
            <PrivateRoute exact path={`${path}/list`} component={List} />
            <PrivateRoute path={`${path}/add`} component={Employee} />
          </Switch>
        </main>
      </div>
    </div>
  );
}
