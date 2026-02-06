package br.com.deposito.excessoes;

import br.com.deposito.dto.MensagemDTO;
import br.com.deposito.dto.ValidandoCampos;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExcessoesGlobais {


    @ExceptionHandler(ClienteNaoEncontrado.class)
    public ResponseEntity<MensagemDTO>clienteNaoEncontrado(){
       var msg = new MensagemDTO(HttpStatus.NOT_FOUND,"Clieente não encontrado.") ;
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }

    @ExceptionHandler(ProdutoNaoEncontrado.class)
    public ResponseEntity<MensagemDTO>produtoNaoEncontrado(){
        var msg = new MensagemDTO(HttpStatus.NOT_FOUND,"Produto não encontrado");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }

    public ResponseEntity<?>tratandoValidacoes(MethodArgumentNotValidException ex){
        var erros = ex.getFieldErrors();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erros.stream().map(ValidandoCampos::new).toList());
    }
}
