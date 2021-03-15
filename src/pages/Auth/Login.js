import { AllInclusive, KeyboardBackspace } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import style from './Auth.module.scss';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      return setError('Failed to log in');
    }

    return setLoading(false);
  }

  return (
    <main className={style.auth}>
      <section className={style.section}>
        <Link to="/" className={style.btnBack}>
          <KeyboardBackspace />
        </Link>

        <div className={style.logo}>
          <AllInclusive />
        </div>

        <h1 className={style.heading}>Entrar</h1>
        {error && <h2>{error}</h2>}

        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              ref={emailRef}
              className={style.input}
              required
            />
            <label htmlFor="email" className={style.label}>
              E-mail
            </label>
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              ref={passwordRef}
              className={style.input}
              required
            />
            <label htmlFor="password" className={style.label}>
              Senha
            </label>
          </div>

          <div>
            <button type="submit" className={style.btn}>
              entrar
            </button>
          </div>

          <div className={style.btnTextContainer}>
            <Link to="/signup" className={`${style.btnText} ${style.btnBlock}`}>
              Cadastar
            </Link>

            <Link to="/forgot-password" className={style.btnText}>
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
