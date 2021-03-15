import React from 'react';

import useFirestore from '../../hooks/useFirestore';
import style from './List.module.scss';

export default function List() {
  const { docs } = useFirestore('employees');

  return (
    <section className={style.section}>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead className={style.tbHead}>
            <tr className={style.tbRow}>
              <th className={style.tbHeading}>Nome</th>
              <th className={style.tbHeading}>E-mail</th>
              <th className={style.tbHeading}>Admissão</th>
              <th className={style.tbHeading}>CPF</th>
              <th className={style.tbHeading}>Endereço</th>
            </tr>
          </thead>
          <tbody className={style.tbBody}>
            {docs &&
              docs.map((doc) => (
                <tr key={doc.id} className={style.tbRow}>
                  <td className={style.tbData}>{doc.nome}</td>
                  <td className={style.tbData}>{doc.email}</td>
                  <td className={style.tbData}>{doc.admissão}</td>
                  <td className={style.tbData}>{doc.cpf}</td>
                  <td className={style.tbData}>
                    {doc.endereço.cidade} / {doc.endereço.estado} /{' '}
                    {doc.endereço.rua} / {doc.endereço.bairro} /{' '}
                    {doc.endereço.cep}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
