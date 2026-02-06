package br.com.deposito.dto;

import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import lombok.Data;

@Data
public class StatusDTO {
    private Long id;
    StatusPagamento pagamento;
    StatusEntrega entrega;
}
