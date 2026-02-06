package br.com.deposito.controller;

import br.com.deposito.dto.ProdutoDTO;
import br.com.deposito.dto.StatusDTO;
import br.com.deposito.enums.StatusEntrega;
import br.com.deposito.enums.StatusPagamento;
import br.com.deposito.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping("/{clienteId}")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "endpoint responsável por cadastro de produtos.")
    @ApiResponse(responseCode = "201", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<ProdutoDTO>salvarProdutos(@PathVariable Long clienteId,
                                                    @RequestBody ProdutoDTO produtoDTO){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(produtoService.salvarProduto(clienteId, produtoDTO));
    }


    @GetMapping("/{clienteId}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "endpoint responsável por calcular o total de produtos por cliente.")
    @ApiResponse(responseCode = "200", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<BigDecimal> buscarTotalPorCliente(@PathVariable Long clienteId) {
        BigDecimal total = produtoService.calcularTotalPorCliente(clienteId);
        return ResponseEntity.status(HttpStatus.OK).body(total);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "endpoint responsável por deletar produto.")
    @ApiResponse(responseCode = "204", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        produtoService.excluirProduto(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/statusPagamento")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "endpoint responsável por atualizar o status do produto.")
    @ApiResponse(responseCode = "200", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<List<ProdutoDTO>>buscarPagamento(@RequestParam StatusPagamento pagamento){
        List<ProdutoDTO> produtos = produtoService.buscarPorPagamento(pagamento);
        return ResponseEntity.status(HttpStatus.OK).body(produtos);
    }

    @GetMapping("/statusEntrega")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "endpoint responsável por atualizar o status da entrega.")
    @ApiResponse(responseCode = "200", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<List<ProdutoDTO>>buscarEntrega(@RequestParam StatusEntrega entrega){
        List<ProdutoDTO>produtos = produtoService.buscarPorEnterga(entrega);
        return ResponseEntity.status(HttpStatus.OK).body(produtos);
    }

    @GetMapping("/cliente/{clienteId}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "endpoint responsável por listar os produtos por cliente.")
    @ApiResponse(responseCode = "204", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<List<ProdutoDTO>> listarProdutosPorCliente(@PathVariable Long clienteId) {
        List<ProdutoDTO> produtos = produtoService.listarProdutosDoCliente(clienteId);
        return ResponseEntity.status(HttpStatus.OK).body(produtos);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "endpoint responsável por atualizar produto.")
    @ApiResponse(responseCode = "200", description = " success", content = {
            @Content(mediaType = "application.json", schema = @Schema(implementation = ResponseEntity.class))
    })
    public ResponseEntity<StatusDTO>atualizarStatus(@PathVariable Long id,@RequestBody StatusDTO dto){
        return ResponseEntity.status(HttpStatus.OK).body(produtoService.atualizarStatus(id, dto));
    }

}
