package br.com.deposito.repository;

import br.com.deposito.dto.ProdutoDTO;
import br.com.deposito.entity.Produto;
import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {

    List<Produto> findByClienteId(Long clienteId);

    List<Produto> findByPagamento(StatusPagamento pagamento);

    List<Produto> findByEntrega(StatusEntrega entrega);
}
