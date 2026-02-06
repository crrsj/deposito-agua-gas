package br.com.deposito.excessoes;

public class ProdutoNaoEncontrado extends RuntimeException{
    public ProdutoNaoEncontrado(String mensagem) {
        super(mensagem);
    }
    public ProdutoNaoEncontrado(){
        super();
    }
}
