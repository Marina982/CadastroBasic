import { useEffect, useState } from "react";
import styles from "../styles/Dados.module.css";

function DadosCad() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/listar.php");
      const data = await response.json();
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente apagar esta pessoa?")) return;

    try {
      await fetch("http://localhost:8000/deletar.php?id=" + id, {
        method: "DELETE",
      });

      fetchData(); // atualiza lista
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Lista de Pessoas Cadastradas</h2>

      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.data_nascimento}</td>
              <td>{pessoa.cpf}</td>
              <td>
                <button
                  className={styles.botaoApagar}
                  onClick={() => handleDelete(pessoa.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DadosCad;