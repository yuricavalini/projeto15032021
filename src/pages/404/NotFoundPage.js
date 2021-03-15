import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p style={{ textAlign: 'center' }}>Página não encontrada.</p>
      <p style={{ textAlign: 'center' }}>
        <Link to="/login">Entre ou cadastre-se </Link>
      </p>
    </div>
  );
}
