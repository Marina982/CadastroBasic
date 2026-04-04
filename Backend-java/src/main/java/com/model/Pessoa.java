package com.model;

public class Pessoa {

    private Integer id;
    private String nome;
    private String data_nascimento;
    private String cpf;

    public Pessoa() {}

    public Pessoa(Integer id, String nome, String data_nascimento, String cpf) {
        this.id = id;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.cpf = cpf;
    }

    public Integer getId() { return id; }        // ← era int
    public void setId(Integer id) { this.id = id; } // ← era int

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getData_nascimento() { return data_nascimento; }
    public void setData_nascimento(String data_nascimento) { this.data_nascimento = data_nascimento; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
}