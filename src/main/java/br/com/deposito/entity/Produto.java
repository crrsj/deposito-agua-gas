package br.com.deposito.entity;

import br.com.deposito.enums.Marca;
import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import br.com.deposito.enums.TipoProduto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
@Data
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private TipoProduto tipo;
    @Enumerated(EnumType.STRING)
    private Marca marca;
    @NotNull(message = " não pode ser nulo.")
    private Integer quantidade;
    private BigDecimal valorUnitario;
    @Enumerated(EnumType.STRING)
    private StatusPagamento pagamento;
    @Enumerated(EnumType.STRING)
    private StatusEntrega entrega;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnore
    private Cliente cliente;

    public BigDecimal getSubtotal() {
        return valorUnitario.multiply(new BigDecimal(quantidade));
    }
}
