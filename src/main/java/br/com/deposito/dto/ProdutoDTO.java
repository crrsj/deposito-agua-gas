package br.com.deposito.dto;

import br.com.deposito.enums.Marca;
import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import br.com.deposito.enums.TipoProduto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoDTO {
    private Long id;
    private TipoProduto tipo;
    private Marca marca;
    private Integer quantidade;
    private BigDecimal valorUnitario;
    private StatusPagamento pagamento;
    private StatusEntrega entrega;
}
