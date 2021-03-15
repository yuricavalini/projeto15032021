import { AllInclusive } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import style from './Home.module.scss';

export default function Home() {
  return (
    <main className={style.home}>
      <section className={style.section}>
        <div className={`${style.logo} ${style.logoAnimated}`}>
          <AllInclusive />
        </div>
        <div className={style.container}>
          <Link
            to="/login"
            className={`${style.btn} ${style.btnPrimary} ${style.btnAnimated}`}
          >
            Entrar
          </Link>
          <Link
            to="/signup"
            className={`${style.btn} ${style.btnSecondary} ${style.btnAnimated}`}
          >
            Cadastrar
          </Link>
        </div>
      </section>
    </main>
  );
}
