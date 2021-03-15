import { AllInclusive, KeyboardBackspace } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import style from './Auth.module.scss';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      return setError('Failed to reset password');
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

        <h1 className={style.heading}>Redefinir Senha</h1>

        {error && <h2>{error}</h2>}
        {message && <h2>{message}</h2>}

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
            <button type="submit" className={style.btn}>
              redefinir senha
            </button>
          </div>

          <div className={style.btnTextContainer}>
            <Link to="/login" className={`${style.btnText} ${style.btnBlock}`}>
              Entrar
            </Link>

            <Link to="/signup" className={style.btnText}>
              Cadastrar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
