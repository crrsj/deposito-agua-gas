
const API_URL = 'http://localhost:8080/api/clientes';


async function cadastrarCliente(event) {
    event.preventDefault(); // Impede a página de recarregar

    const clienteData = {
        nome: document.getElementById('nomeCliente').value,
        telefone: document.getElementById('telefoneCliente').value,
        logradouro: document.getElementById('logradouroCliente').value,
        numero: document.getElementById('numeroCliente').value,
        bairro: document.getElementById('bairroCliente').value,
        cidade: document.getElementById('cidadeCliente').value,
        uf: document.getElementById('ufCliente').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });

        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            toggleModal('modalCliente'); // Fecha o modal
            location.reload(); // Recarrega a lista para mostrar o novo cliente
        } else {
            const erro = await response.json();
            alert('Erro ao cadastrar: ' + (erro.message || 'Verifique os dados'));
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Não foi possível conectar ao servidor.');
    }
}


async function listarClientes(pagina = 0) {
    try {
        const response = await fetch(`${API_URL}?page=${pagina}&size=10`);
        const data = await response.json();
        
        // No Spring Page, a lista real fica em 'content'
        const listaClientes = data.content || [];
        
        renderizarLinhasTabela(listaClientes);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
    }
}


/**
 * RESPONSABILIDADE: Gerar o HTML dos botões de ação com layout resiliente.
 */
function criarBotoesAcao(cliente) {
    // Escapamos o nome do cliente para evitar erros com aspas no onclick
    const nomeEscapado = cliente.nome.replace(/'/g, "\\'");

    return `
        <div class="flex flex-wrap items-center justify-center gap-2 min-w-[150px]">
            <button onclick="exibirProdutosDoCliente(${cliente.id}, '${nomeEscapado}')" 
                    class="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                    title="Ver Histórico de Vendas">
                📋
            </button>

            <button onclick="toggleModal('modalProduto', ${cliente.id})" 
                    class="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="Lançar Produto">
                📦
            </button>
            
            <button onclick="prepararEdicao(${cliente.id})" 
                    class="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                    title="Editar Cliente">
                ✏️
            </button>
            
            <button onclick="excluirCliente(${cliente.id})" 
                    class="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Excluir Cliente">
                🗑️
            </button>
        </div>
    `;
}

/*
function criarBotoesAcao(id) {
    return `
        <div class="flex justify-center gap-2">
            <button onclick="toggleModal('modalProduto', ${id})" class="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                📦
            </button>
            <button onclick="prepararEdicao(${id})" class="p-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all">
                ✏️
            </button>
            <button onclick="excluirCliente(${id})" class="p-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                🗑️
            </button>
        </div>
    `;
}
*/


/*
function renderizarLinhasTabela(clientes) {
    const tbody = document.getElementById('tabelaClientesBody');
    if (!tbody) return;

    tbody.innerHTML = ''; // Limpa antes de preencher

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50/50 dark:hover:bg-gray-800/40 border-b dark:border-gray-700 transition-colors";
        
        tr.innerHTML = `
            <td class="px-6 py-4 font-mono text-xs text-gray-400">#${cliente.id}</td>
            <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
                ${cliente.nome}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                ${cliente.logradouro}, ${cliente.numero} - ${cliente.bairro}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                ${cliente.cidade} / ${cliente.uf}
            </td>
            <td class="px-6 py-4">
                ${criarBotoesAcao(cliente.id)}
            </td>
        `;
        tbody.appendChild(tr);
    });
}
*/

function renderizarLinhasTabela(clientes) {
    const tbody = document.getElementById('tabelaClientesBody');
    if (!tbody) return;

    tbody.innerHTML = ''; 

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50/50 dark:hover:bg-gray-800/40 border-b dark:border-gray-700 transition-colors";
        
        tr.innerHTML = `
            <td class="px-6 py-4 font-mono text-xs text-gray-400">#${cliente.id}</td>
            <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
                ${cliente.nome}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                ${cliente.logradouro}, ${cliente.numero} - ${cliente.bairro}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                ${cliente.cidade} / ${cliente.uf}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${criarBotoesAcao(cliente)}
            </td>
        `;
        tbody.appendChild(tr);
    });
}


async function prepararEdicao(id) {

    // Dentro da sua função prepararEdicao ou toggleModal:
    
    try {
        // Verifique se API_URL termina com /clientes (ex: http://localhost:8080/api/clientes)
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) throw new Error("Cliente não encontrado");

        const cliente = await response.json();

        // Preenche o formulário exclusivo de edição (IDs com prefixo edit_)
        document.getElementById('edit_id').value = cliente.id;
        document.getElementById('edit_nome').value = cliente.nome;
        document.getElementById('edit_telefone').value = cliente.telefone;
        document.getElementById('edit_logradouro').value = cliente.logradouro;
        document.getElementById('edit_numero').value = cliente.numero;
        document.getElementById('edit_bairro').value = cliente.bairro;
        document.getElementById('edit_cidade').value = cliente.cidade;
        document.getElementById('edit_uf').value = cliente.uf;

        await atualizarExibicaoTotal(id, 'spanTotalAcumulado');

        // 4. ATUALIZA A TABELA DE PRODUTOS (AQUI!)
        // Chamamos a função de histórico
        await carregarHistoricoProdutos(id);

        // Abre o modal
        document.getElementById('modalEdicao').classList.remove('modal-hidden');
        
    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao buscar dados do cliente para edição.");
    }
}

/**
 * 2. RESPONSABILIDADE: Capturar dados do modal de edição e enviar via PATCH.
 */
async function executarEdicao(event) {
    event.preventDefault();

    const id = document.getElementById('edit_id').value;
    const dadosAtualizados = {
        nome: document.getElementById('edit_nome').value,
        telefone: document.getElementById('edit_telefone').value,
        uf: document.getElementById('edit_uf').value,
        logradouro: document.getElementById('edit_logradouro').value,
        numero: document.getElementById('edit_numero').value,
        bairro: document.getElementById('edit_bairro').value,
        cidade: document.getElementById('edit_cidade').value
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert("Cliente atualizado com sucesso!");
            fecharModalEdicao();
            listarClientes(); // Atualiza a tabela
        }
    } catch (error) {
        alert("Erro ao atualizar cliente.");
    }
}


/**
 * RESPONSABILIDADE: Deletar o cliente via ID.
 */
async function excluirCliente(id) {
    // 1. Confirmação para evitar acidentes
    const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
    
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("🗑️ Cliente removido com sucesso!");
            listarClientes(); // Recarrega a tabela sem dar reload na página
        } else {
            throw new Error("Não foi possível excluir o cliente.");
        }
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir cliente. Verifique se ele possui produtos vinculados.");
    }
}

/**
 * 3. RESPONSABILIDADE: Controle Visual do Modal.
 */
function abrirModalEdicao() {
    document.getElementById('modalEdicao').classList.remove('modal-hidden');
}

function fecharModalEdicao() {
    document.getElementById('modalEdicao').classList.add('modal-hidden');
    document.getElementById('formEdicao').reset();
}

// Ouvinte de evento exclusivo para o formulário de edição
document.getElementById('formEdicao').addEventListener('submit', executarEdicao);


// Vincular a função ao formulário
document.querySelector('#modalCliente form').addEventListener('submit', cadastrarCliente);

document.addEventListener('DOMContentLoaded', () => {
    listarClientes(0); 
});


/**
 * RESPONSABILIDADE: Mapear os campos do HTML para o formato do ProdutoDTO.
 */
function obterDadosProdutoDoForm() {
    return {
        // Enums devem ser enviados como String em maiúsculas
        tipo: document.getElementById('p_tipo').value.toUpperCase(), 
        marca: document.getElementById('p_marca').value.toUpperCase(),
        quantidade: parseInt(document.getElementById('p_quantidade').value),
        
        // BigDecimal no Java aceita Number ou String numérica no JSON
        valorUnitario: parseFloat(document.getElementById('p_valorUnitario').value),
        
        // Enums de Status
        pagamento: document.getElementById('p_pagamento').value.toUpperCase(),
        entrega: document.getElementById('p_entrega').value.toUpperCase()
    };
}


async function buscarTotalFinanceiro(clienteId) {
    try {
        const response = await fetch(`http://localhost:8080/api/produtos/${clienteId}`);
        if (!response.ok) throw new Error("Erro ao buscar total");
        
        const total = await response.json();
        return total; // Retorna o valor numérico (ex: 150.50)
    } catch (error) {
        console.error("Falha ao obter total do cliente:", error);
        return 0;
    }
}

/**
 * 2. RESPONSABILIDADE: Formatar o número para moeda brasileira (R$) e exibir no HTML.
 */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

/**
 * 3. RESPONSABILIDADE: Atualizar um elemento específico na tela com o total.
 * Útil para mostrar o total dentro do modal ou em um detalhe da lista.
 */
async function atualizarExibicaoTotal(clienteId, elementoId) {
    const valorTotal = await buscarTotalFinanceiro(clienteId);
    const elemento = document.getElementById(elementoId);
    
    if (elemento) {
        elemento.innerText = formatarMoeda(valorTotal);
    }
}

/**
 * 1. RESPONSABILIDADE: Buscar a lista de produtos do servidor.
 */
async function buscarProdutosDoCliente(clienteId) {
    try {
        // Ajuste a URL conforme seu Controller de Produtos (ex: @GetMapping("/por-cliente/{id}"))
        const response = await fetch(`http://localhost:8080/api/produtos/cliente/${clienteId}`);
        if (!response.ok) throw new Error("Erro ao buscar histórico de produtos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * 2. RESPONSABILIDADE: Gerar o HTML para uma única linha da tabela.
 */
function criarLinhaProduto(produto) {
    // Formatação de valores para moeda
    const valorFormatado = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(produto.valorUnitario * produto.quantidade);

    const corStatus = produto.pagamento === 'PAGO' ? 'text-green-500' : 'text-amber-500';

    return `
        <tr class="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
            <td class="px-4 py-3 font-semibold text-gray-300">${produto.tipo}</td>
            <td class="px-4 py-3 text-gray-400">${produto.marca}</td>
            <td class="px-4 py-3 text-center">${produto.quantidade}</td>
            <td class="px-4 py-3 font-mono text-white">${valorFormatado}</td>
            <td class="px-4 py-3 text-[10px] font-bold ${corStatus}">${produto.pagamento}</td>
        </tr>
    `;
}

/**
 * 3. RESPONSABILIDADE: Orquestrar a renderização da tabela no modal.
 */
async function carregarHistoricoProdutos(clienteId) {
    const tbody = document.getElementById('tabelaProdutosClienteBody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Carregando...</td></tr>';

    const produtos = await buscarProdutosDoCliente(clienteId);

    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Nenhuma compra registrada.</td></tr>';
        return;
    }

    tbody.innerHTML = produtos.map(p => criarLinhaProduto(p)).join('');
}


/**
 * RESPONSABILIDADE: Coletar dados, salvar no banco e atualizar a tela.
 */
async function cadastrarProduto(event) {
    event.preventDefault();

    const clienteId = document.getElementById('p_clienteId').value;
    // Captura o nome do cliente do campo de texto (evita o erro [object HTML...])
    const nomeCliente = document.getElementById('edit_nome')?.value || "Cliente";

    const produtoDTO = {
        tipo: document.getElementById('p_tipo').value,
        marca: document.getElementById('p_marca').value,
        quantidade: parseInt(document.getElementById('p_quantidade').value),
        valorUnitario: parseFloat(document.getElementById('p_valorUnitario').value),
        pagamento: document.getElementById('p_pagamento').value,
        entrega: document.getElementById('p_entrega').value
    };

    try {
        const response = await fetch(`http://localhost:8080/api/produtos/${clienteId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoDTO)
        });

        if (response.ok) {
            alert("✅ Venda finalizada com sucesso!");
            document.getElementById('formProduto').reset();
            fecharModalProduto(); // Função que fecha o modal
            
            // ATUALIZAÇÃO AUTOMÁTICA: Chama a listagem com os novos dados
            await exibirProdutosDoCliente(clienteId, nomeCliente);
        } else {
            alert("❌ Erro ao salvar o produto.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
    }
}

/*
async function cadastrarProduto(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // 1. Recupera o ID do cliente (que deve estar em um input hidden no modal)
    const clienteId = document.getElementById('p_clienteId').value;
    
    // 2. Monta o objeto exatamente com os nomes do seu ProdutoDTO
    const produtoDTO = {
        tipo: document.getElementById('p_tipo').value,
        marca: document.getElementById('p_marca').value,
        quantidade: parseInt(document.getElementById('p_quantidade').value),
        valorUnitario: parseFloat(document.getElementById('p_valorUnitario').value),
        pagamento: document.getElementById('p_pagamento').value, // Deve ser 'PAGO' ou 'PENDENTE'
        entrega: document.getElementById('p_entrega').value     // Deve ser 'ENTREGUE' ou 'PENDENTE'
    };

    try {
        // 3. Envia para a API (Note a URL batendo com o seu @PostMapping("/{clienteId}"))
        const response = await fetch(`http://localhost:8080/api/produtos/${clienteId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoDTO)
        });

        if (response.ok) {
            alert("✅ Produto salvo com sucesso!");
            
            // Limpa o formulário e fecha o modal
            document.getElementById('formProduto').reset();
            toggleModal('modalProduto'); 
            await exibirProdutosDoCliente(clienteId, nomeCliente);
            
            // Atualiza a interface (Total e Tabela externa)
            atualizarExibicaoTotal(clienteId, 'spanTotalAcumulado');
          //  renderizarTabelaProdutosExterno(clienteId);
         
        } else {
            const erro = await response.json();
            alert("❌ Erro ao salvar: " + (erro.message || "Verifique os dados."));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("🚀 Erro de conexão com o servidor.");
    }
}

*/
async function exibirProdutosDoCliente(clienteId, nomeCliente) {
    const secao = document.getElementById('secaoProdutos');
    const tbody = document.getElementById('corpoTabelaProdutos');
    const displayNome = document.getElementById('nomeClienteSelecionado');
    const spanTotal = document.getElementById('spanTotalTabelaExterno');

    if (!secao || !tbody) return;

    // Tratamento para evitar [object HTMLInputElement]
    const nomeLimpo = (typeof nomeCliente === 'object' && nomeCliente.value) 
                      ? nomeCliente.value 
                      : nomeCliente;

    secao.classList.remove('hidden');
    if (displayNome) displayNome.innerText = nomeLimpo;
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-10 text-gray-400">Buscando dados...</td></tr>';

    try {
        const [resProdutos, resTotal] = await Promise.all([
            fetch(`http://localhost:8080/api/produtos/cliente/${clienteId}`),
            fetch(`http://localhost:8080/api/produtos/${clienteId}`)
        ]);

        const produtos = await resProdutos.json();
        const totalAcumulado = await resTotal.json();

        if (spanTotal) {
            spanTotal.innerText = (totalAcumulado || 0).toLocaleString('pt-BR', {
                style: 'currency', currency: 'BRL'
            });
        }

        if (produtos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-10 text-gray-500">Nenhum registro encontrado.</td></tr>';
            return;
        }

        tbody.innerHTML = produtos.map(p => {
            // Lógica de Pagamento
            const proxPagamento = p.pagamento === 'PAGO' ? 'PENDENTE' : 'PAGO';
            const corPagamento = p.pagamento === 'PAGO' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

            // Lógica de Entrega (Adicionada agora)
            const proxEntrega = p.entrega === 'ENTREGUE' ? 'PENDENTE' : 'ENTREGUE';
            const corEntrega = p.entrega === 'ENTREGUE'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';

            return `
                <tr class="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td class="px-6 py-4 font-bold text-gray-800 dark:text-gray-200">${p.tipo}</td>
                    <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">${p.marca}</td>
                    <td class="px-6 py-4 text-center text-gray-700 dark:text-gray-300 font-medium">${p.quantidade}</td>
                    <td class="px-6 py-4 font-mono text-green-600 font-bold text-right">
                        ${(p.quantidade * p.valorUnitario).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                        <button onclick="alternarStatusProduto(${p.id}, 'pagamento', '${proxPagamento}', ${clienteId}, '${nomeLimpo}')"
                            class="text-[10px] font-black px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm ${corPagamento}">
                            ${p.pagamento}
                        </button>
                    </td>

                    <td class="px-6 py-4 text-center">
                        <button onclick="alternarStatusProduto(${p.id}, 'entrega', '${proxEntrega}', ${clienteId}, '${nomeLimpo}')"
                            class="text-[10px] font-black px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm ${corEntrega}">
                            ${p.entrega}
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        secao.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error("Erro:", error);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-10 text-red-500 font-bold">⚠️ Falha ao carregar histórico.</td></tr>';
    }
}

/**
 * RESPONSABILIDADE: Esconder o modal de cadastro de produtos.
 */
function fecharModalProduto() {
    const modal = document.getElementById('modalProduto');
    if (modal) {
        modal.classList.add('hidden'); // Adiciona a classe que esconde o elemento
    }
}

/**
 * RESPONSABILIDADE: Coletar dados do formulário, salvar no banco e atualizar a tela.
 */
async function cadastrarProduto(event) {
    event.preventDefault();

    const clienteId = document.getElementById('p_clienteId').value;
    // Captura o texto do nome para evitar o erro de [object HTMLInputElement]
    const nomeCliente = document.getElementById('edit_nome')?.value || "Cliente";

    const produtoDTO = {
        tipo: document.getElementById('p_tipo').value,
        marca: document.getElementById('p_marca').value,
        quantidade: parseInt(document.getElementById('p_quantidade').value),
        valorUnitario: parseFloat(document.getElementById('p_valorUnitario').value),
        pagamento: document.getElementById('p_pagamento').value,
        entrega: document.getElementById('p_entrega').value
    };

    try {
        const response = await fetch(`http://localhost:8080/api/produtos/${clienteId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoDTO)
        });

        if (response.ok) {
            alert("✅ Venda finalizada com sucesso!");
            
            // Limpa os campos para a próxima venda
            document.getElementById('formProduto').reset();
            
            // CHAMA A FUNÇÃO DE FECHAR (Agora definida acima)
            fecharModalProduto(); 
            
            // ATUALIZAÇÃO AUTOMÁTICA: Recarrega o histórico e o total acumulado
            await exibirProdutosDoCliente(clienteId, nomeCliente);
        } else {
            const erro = await response.json();
            alert("❌ Erro ao salvar: " + (erro.message || "Verifique os dados."));
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("🚀 Falha na conexão com o servidor.");
    }
}

/**
 * RESPONSABILIDADE: Atualizar status via PATCH e sincronizar o Total Acumulado.
 */
async function alternarStatusProduto(produtoId, campo, novoStatus, clienteId, nomeCliente) {
    const statusDTO = {};
    statusDTO[campo] = novoStatus; 

    try {
        const response = await fetch(`http://localhost:8080/api/produtos/${produtoId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statusDTO)
        });

        if (response.ok) {
            // Recarrega a tabela e recalcula o Total (BigDecimal) vindo do Java
            await exibirProdutosDoCliente(clienteId, nomeCliente);
        }
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
    }
}

/*
async function alternarStatusProduto(produtoId, campo, novoStatus, clienteId, nomeCliente) {
    const url = `http://localhost:8080/api/produtos/${produtoId}`;
    
    // Monta o DTO conforme seu StatusDTO (ex: apenas o campo que mudou)
    const statusDTO = {};
    statusDTO[campo] = novoStatus; 

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statusDTO)
        });

        if (response.ok) {
            // Recarrega a tabela e o total para refletir a mudança
            await exibirProdutosDoCliente(clienteId, nomeCliente);
        }
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Falha ao atualizar o status.");
    }
}
*/

function fecharTabelaProdutos() {
    document.getElementById('secaoProdutos').classList.add('hidden');
}