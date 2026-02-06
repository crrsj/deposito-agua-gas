package br.com.deposito.service;


import br.com.deposito.dto.ClienteDTO;
import br.com.deposito.entity.Cliente;
import br.com.deposito.excessoes.ClienteNaoEncontrado;
import br.com.deposito.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ModelMapper modelMapper;
    private final ClienteRepository clienteRepository;

    public ClienteDTO salvarCliente(ClienteDTO clienteDTO){
        var cliente = modelMapper.map(clienteDTO, Cliente.class);
        var clienteSalvo = clienteRepository.save(cliente);
        return modelMapper.map(clienteSalvo, ClienteDTO.class);
    }
    public Page<ClienteDTO>listarClientes(Pageable pageable){
        return clienteRepository.findAll(pageable)
                .map(cliente->modelMapper.map(cliente, ClienteDTO.class));
    }

    public ClienteDTO buscarClientePorId(Long id){
        var cliente = clienteRepository.findById(id).orElseThrow(()->new ClienteNaoEncontrado("Cliente não encontrado!"));
        return modelMapper.map(cliente, ClienteDTO.class);
    }

    @Transactional
    public ClienteDTO atualizarCliente(Long id, ClienteDTO clienteDTO){
        var cliente = clienteRepository.findById(id).orElseThrow(()->new ClienteNaoEncontrado("Cliente não encontrado!"));
        modelMapper.map(clienteDTO,cliente);
        var clienteAtualizado = clienteRepository.save(cliente);
        return modelMapper.map(clienteAtualizado, ClienteDTO.class);
    }

    public void excluirCliente(Long id){
        var cliente = clienteRepository.findById(id).orElseThrow(()->new ClienteNaoEncontrado("Cliente não encontrado!"));
        clienteRepository.delete(cliente);
    }
}
