import { useEffect, useState } from "react";

function DadosCad() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/listar.php");
        const data = await response.json();
        setPessoas(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.id}</td>
              <td>{pessoa.nome}</td>
              <td>{pessoa.data_nascimento}</td>
              <td>{pessoa.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DadosCad;