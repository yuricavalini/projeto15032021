import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { projectFirestore } from '../../firebase';
import useStorage from '../../hooks/useStorage';
import style from './Employee.module.scss';

export default function Employee() {
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const cpfRef = useRef();
  const streetRef = useRef();
  const zipcodeRef = useRef();
  const neighborhoodRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const statusRef = useRef();
  const [file, setFile] = useState(null);

  // running before file state is set
  // const { url } = useStorage(file);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const type = ['image/png', 'image/jpeg'];

  function changeHandler(e) {
    const selected = e.target.files[0];

    if (selected && type.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Por favor, selecione um arquivo de imagem (png or jpeg)');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      const db = projectFirestore;

      let situação = '';
      if (statusRef.current.checked === true) {
        situação = 'ativo';
      } else {
        situação = 'inativo';
      }

      await db.collection('employees').add({
        nome: nameRef.current.value,
        email: emailRef.current.value,
        admissão: dateRef.current.value,
        cpf: cpfRef.current.value,
        endereço: {
          rua: streetRef.current.value,
          cep: zipcodeRef.current.value,
          bairro: neighborhoodRef.current.value,
          cidade: cityRef.current.value,
          estado: stateRef.current.value,
        },
        // foto: url,
        situação,
      });

      history.push('/dashboard/list');
    } catch {
      return setError('Failed to register');
    }

    return setLoading(false);
  }

  return (
    <section className={style.section}>
      <div className={style.headingContainer}>
        <h1 className={style.heading}>Adicionar Novo Colaborador</h1>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div>
          <input
            type="name"
            id="name"
            placeholder="Nome"
            ref={nameRef}
            className={style.input}
            required
          />
          <label htmlFor="name" className={style.label}>
            Nome
          </label>
        </div>

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
            type="date"
            id="date"
            placeholder="Data de admissão"
            ref={dateRef}
            className={style.input}
            required
          />
          <label htmlFor="date" className={style.label}>
            Data de admissão
          </label>
        </div>

        <div>
          <input
            type="text"
            id="cpf"
            placeholder="CPF"
            ref={cpfRef}
            className={style.input}
            required
          />
          <label htmlFor="cpf" className={style.label}>
            CPF
          </label>
        </div>

        <div>
          <input
            type="text"
            id="street"
            placeholder="Rua"
            ref={streetRef}
            className={style.input}
            required
          />
          <label htmlFor="street" className={style.label}>
            Rua
          </label>
        </div>

        <div>
          <input
            type="text"
            id="cep"
            placeholder="CEP"
            ref={zipcodeRef}
            className={style.input}
            required
          />
          <label htmlFor="cep" className={style.label}>
            CEP
          </label>
        </div>

        <div>
          <input
            type="text"
            id="neighborhood"
            placeholder="Bairro"
            ref={neighborhoodRef}
            className={style.input}
            required
          />
          <label htmlFor="neighborhood" className={style.label}>
            Bairro
          </label>
        </div>

        <div>
          <input
            type="text"
            id="city"
            placeholder="Cidade"
            ref={cityRef}
            className={style.input}
            required
          />
          <label htmlFor="city" className={style.label}>
            Cidade
          </label>
        </div>

        <div>
          <input
            type="text"
            id="state"
            placeholder="Estado"
            ref={stateRef}
            className={style.input}
            required
          />
          <label htmlFor="state" className={style.label}>
            Estado
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            id="status"
            ref={statusRef}
            className={style.checkbox}
          />
          <label htmlFor="status" className={style.checkboxLabel}>
            O colaborador está ativo? Marque para sim.
          </label>
        </div>

        <div>
          <input
            type="file"
            id="img"
            placeholder="Foto"
            className={style.input}
            onChange={changeHandler}
            // required
          />
          <label htmlFor="state" className={style.label}>
            Foto
          </label>
        </div>

        <div>
          <button type="submit" className={style.btn}>
            cadastrar
          </button>
        </div>
      </form>
    </section>
  );
}
