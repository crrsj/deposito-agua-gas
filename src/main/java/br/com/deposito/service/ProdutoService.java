package br.com.deposito.service;

import br.com.deposito.dto.ProdutoDTO;
import br.com.deposito.dto.StatusDTO;
import br.com.deposito.entity.Produto;
import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import br.com.deposito.excessoes.ClienteNaoEncontrado;
import br.com.deposito.excessoes.ProdutoNaoEncontrado;
import br.com.deposito.repository.ClienteRepository;
import br.com.deposito.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ModelMapper modelMapper;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public ProdutoDTO salvarProduto(Long clienteId,ProdutoDTO produtoDTO){
        var cliente = clienteRepository.findById(clienteId).orElseThrow(()->new ClienteNaoEncontrado("Cliente não encontrado!"));
        var produto = modelMapper.map(produtoDTO, Produto.class);
        produto.setCliente(cliente);
        var produtoSalvo = produtoRepository.save(produto);
        return modelMapper.map(produtoSalvo, ProdutoDTO.class);
    }

    public BigDecimal calcularTotalPorCliente(Long clienteId) {
        List<Produto> produtosDoCliente = produtoRepository.findByClienteId(clienteId);
        return produtosDoCliente.stream()
                .map(Produto::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public ProdutoDTO buscarProdutoPorId(Long id){
        var produto  = produtoRepository.findById(id).orElseThrow(()->new ProdutoNaoEncontrado("Produto não encontrado!"));
        return modelMapper.map(produto, ProdutoDTO.class);
    }

    public void excluirProduto(Long id){
        var produto  = produtoRepository.findById(id).orElseThrow(()->new ProdutoNaoEncontrado("Produto não encontrado!"));
        produtoRepository.delete(produto);
    }

    public List<ProdutoDTO> buscarPorPagamento(StatusPagamento pagamento){
        List<Produto>produtos = produtoRepository.findByPagamento(pagamento);
        return produtos.stream().map(listar->modelMapper.map(listar, ProdutoDTO.class)).toList();
    }

    public List<ProdutoDTO>buscarPorEnterga(StatusEntrega entrega){
        List<Produto>produtos = produtoRepository.findByEntrega(entrega);
            return  produtos.stream().map(listar->modelMapper.map(listar, ProdutoDTO.class)).toList();
        }

    public List<ProdutoDTO> listarProdutosDoCliente(Long clienteId) {
        List<Produto> produtos = produtoRepository.findByClienteId(clienteId);

        return produtos.stream()
                .map(produto -> modelMapper.map(produto, ProdutoDTO.class))
                .collect(Collectors.toList());
    }


    public StatusDTO atualizarStatus(Long id, StatusDTO dto){
        var produto  = produtoRepository.findById(id).orElseThrow(()->new ProdutoNaoEncontrado("Produto não encontrado!"));
        modelMapper.map(dto,produto);
        var statusAtualizado = produtoRepository.save(produto);
        return modelMapper.map(statusAtualizado,StatusDTO.class);
    }
}
