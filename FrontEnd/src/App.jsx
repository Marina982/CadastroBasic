import { useState } from "react";
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

    const response = await fetch("http://localhost/cadastro.php", {
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;