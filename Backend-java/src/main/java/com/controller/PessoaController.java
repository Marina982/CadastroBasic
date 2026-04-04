package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import com.model.Pessoa;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PessoaController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // ✅ CADASTRAR (POST)
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Pessoa pessoa) {

        Map<String, String> response = new HashMap<>();

        try {
            String sql = "INSERT INTO pessoas (nome, data_nascimento, cpf) VALUES (?, ?, ?)";

            jdbcTemplate.update(sql,
                    pessoa.getNome(),
                    pessoa.getData_nascimento(),
                    pessoa.getCpf()
            );

            response.put("message", "Cadastro realizado com sucesso");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Erro: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // ✅ LISTAR (GET)
    @GetMapping("/pessoas")
    public List<Pessoa> listar() {

        String sql = "SELECT id, nome, data_nascimento, cpf FROM pessoas ORDER BY id ASC";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Pessoa p = new Pessoa();
            p.setId(rs.getInt("id"));
            p.setNome(rs.getString("nome"));
            p.setData_nascimento(rs.getString("data_nascimento"));
            p.setCpf(rs.getString("cpf"));
            return p;
        });
    }

    // ✅ DELETAR (DELETE)
    @DeleteMapping("/pessoas/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {

        Map<String, String> response = new HashMap<>();

        try {
            String sql = "DELETE FROM pessoas WHERE id = ?";

            int linhas = jdbcTemplate.update(sql, id);

            if (linhas > 0) {
                response.put("message", "Pessoa deletada com sucesso");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Pessoa não encontrada");
                return ResponseEntity.status(404).body(response);
            }

        } catch (Exception e) {
            response.put("message", "Erro: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}

