package br.com.deposito.entity;

import br.com.deposito.enums.Uf;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.apache.logging.log4j.message.Message;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = " não pode estar em branco.")
    private String nome;
    @NotBlank(message = " não pode estar em branco.")
    private String telefone;
    @NotBlank(message = " não pode estar em branco.")
    private String logradouro;
    private String numero;
    @NotBlank(message = " não pode estar em branco.")
    private String bairro;
    @NotBlank(message = " não pode estar em branco.")
    private String cidade;
    @Enumerated(EnumType.STRING)
    private Uf uf;
    @OneToMany(mappedBy = "cliente",cascade = CascadeType.ALL)
    private List<Produto>produtos = new ArrayList<>();

}
