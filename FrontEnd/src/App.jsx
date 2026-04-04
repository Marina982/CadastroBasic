import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/App.module.css";

function App() {
  const [form, setForm] = useState({
    nome: "",
    data_nascimento: "",
    cpf: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      alert(data.message);

      setForm({
        nome: "",
        data_nascimento: "",
        cpf: ""
      });

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
  <div className={styles.cardHeader}>
    <h2>Novo cadastro</h2>
  </div>
  <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.field}>
      <label>Nome completo</label>
      <input type="text" name="nome" placeholder="Ex: João Silva" value={form.nome} onChange={handleChange} required />
    </div>
    <div className={styles.field}>
      <label>Data de nascimento</label>
      <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} required />
    </div>
    <div className={styles.field}>
      <label>CPF</label>
      <input type="text" name="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} required />
    </div>
    <button type="submit">Cadastrar</button>
    <Link to="/Dados" className={styles.link}>Ver pessoas cadastradas →</Link>
  </form>
</div>
    </div>
  );
}

export default App;