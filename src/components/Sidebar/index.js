import {
  AllInclusive,
  People,
  PersonAdd,
  PersonAddOutlined,
  Star,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, useRouteMatch, Link } from 'react-router-dom';

import style from './Sidebar.module.scss';

export default function Sidebar({ handleLogout, error, currentUser }) {
  const { path } = useRouteMatch();

  return (
    <>
      <aside className={style.sidebar}>
        <header className={style.header}>
          <AllInclusive />
        </header>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={style.listItem}>
              <NavLink to={`${path}/list`} className={style.link}>
                <People />
                Lista
              </NavLink>
            </li>
            <li className={style.listItem}>
              <NavLink to={`${path}/add`} className={style.link}>
                <PersonAdd />
                Adicionar
              </NavLink>
            </li>
            <li className={style.listItem}>
              <NavLink
                to={`${path}`}
                className={style.link}
                exact
                activeClassName="active"
              >
                <Star />
                Estatística
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={style.btnContainer}>
          {error && <h3>{error}</h3>}
          <div className={style.adm}>
            <strong>Administrador: {currentUser} </strong>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className={`${style.btn} ${style.btnPadding}`}
          >
            Log Out
          </button>
          <Link
            to="/forgot-password"
            className={`${style.btn} ${style.btnPadding}`}
          >
            Redefinir senha
          </Link>
          <Link to={`${path}/add`} className={style.btn}>
            <PersonAddOutlined />
          </Link>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};
