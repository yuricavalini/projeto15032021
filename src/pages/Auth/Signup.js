import { AllInclusive, KeyboardBackspace } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import style from './Auth.module.scss';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/login');
    } catch {
      return setError('Failed to create an account');
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

        <h1 className={style.heading}>Cadastrar</h1>
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
            <input
              type="password"
              id="confirm"
              placeholder="Confirmar Senha"
              ref={passwordConfirmRef}
              className={style.input}
              required
            />
            <label htmlFor="confirm" className={style.label}>
              Confirmar Senha
            </label>
          </div>

          <div>
            <button type="submit" className={style.btn}>
              cadastrar
            </button>
          </div>

          <div className={style.btnTextContainer}>
            <Link to="/login" className={`${style.btnText} ${style.btnBlock}`}>
              Entrar
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
