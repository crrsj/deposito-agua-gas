package br.com.deposito.dto;

import br.com.deposito.entity.Produto;
import br.com.deposito.enums.Uf;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class ClienteDTO {
    private Long id;
    private String nome;
    private String telefone;
    private String logradouro;
    private String numero;
    private String bairro;
    private String cidade;
    private Uf uf;
    private List<Produto> produtos = new ArrayList<>();
}
