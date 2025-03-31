const formCadCliente = document.getElementById('formCadCliente');
const acao ="cadastrar";
function manipularEnvio(evento) {
    evento.preventDefault();
    if (formCadCliente.checkValidity()) {
        formCadCliente.classList.add('was-validated');
        formCadClienteCaoCliente.reset();
    } else {
      if (acao == "cadastrar") {
        gravarClientes();
        formCadClienteCaoCliente.reset();
      
    }
      
    
    else if (acao == "atualizar") {
        atualizarClientes();
        formCadClienteCaoCliente.reset();
    }
    else if (acao == "excluir") {
        excluirClientes();
        formCadClienteCaoCliente.reset();
    }
  }
}

          evento.preventDefault();
          evento.stopPropagation();
   
    

    function pegarDadosClientes() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        return {nome, email, telefone, senha, confirmarSenha};
      }

      return{
       "nome": nome,
      "email": email,
      "senha": senha,
    }



   function gravarClientes() {
        const clientes = pegarDadosClientes();
       fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientes)
      }).then(resposta => {
        if (resposta.ok) {
          mostrarMensagem('Cadastro realizado com sucesso');"success";
        } else {
          mostrarMensagem('Erro ao cadastrar cliente'); "danger";
        }
      }).catch(erro => {
        console.log(erro);
        mostrarMensagem('Erro ao cadastrar cliente'); "danger";
      });
      }
      
      function mostrarMensagem(mensagem,tipo="success") {
        const divMensagem = document.getElementById('mensagem');
        espacoMensagem.innerHTML = 
        `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        setInterval(() => {
          espacoMensagem.innerHTML = '';
        }, 3000);
       

}

 function mostrarTablaClientes() {
       fetch('http://localhost:3000/clientes',{
          method: 'GET',

       }).then((resposta) => resposta => {
             return resposta.json();
       }).then((dadosRecebidos) => {
            if (dadosRecebidos.status) {
                const clientes = dadosRecebidos.clientes;
                const tabela = document.getElementById('tabelaClientes');
                tabela.ClassName= "table table-striped table-bordered table-hover";
                const cabecalho = document.createTHead("thead");
                const corpo = document.createElement("tbody");
                cabecalho.innerHTML = `
                
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Senha</th>
                <th scope="col">Confirmar Senha</th>
                <th scope="col">Editar</th>

                </tr>
                `;
                tabela.appendChild(cabecalho);
                for (let i = 0; i < clientes.length; i++) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                    <td>${clientes[i].nome}</td>
                    <td>${clientes[i].email}</td>
                    <td>${clientes[i].telefone}</td>
                    <td>${clientes[i].senha}</td>
                    <td>${clientes[i].confirmarSenha}</td>
                    
                    <td>
                    
                    button class="btn btn-primary" onclick="procurarClientes('${clientes[i].nome}', 
                                                                             '${clientes[i].email}', 
                                                                             '${clientes[i].telefone}', 
                                                                                 '${clientes[i].senha}', 
                                                             '${clientes[i].confirmarSenha}')">Editar</button>
                    </td>
                    button class="btn btn-danger" onclick="excluirClientes('${clientes[i].id}')">Excluir</button>
                    `;
                    




                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                
        



            }
            else {
             mostrarMensagem(dadosRecebidos.mensagem, 'danger');
            }


      }).catch((erro) => {
        mostrarMensagem(erro, 'danger');
      })

    }

      function procurarCliente(nome, email, telefone, senha, ) {
        document.getElementById('nome').value = nome;
        document.getElementById('email').value = email;
        document.getElementById('senha').value = senha;
        if (acao == "atualizar") {
          document.getElementById('atualizar').disabled = false;
          document.getElementById('cadastrar').disabled = true;
          document.getElementById('excluir').disabled = false;
        }
        else if (acao == "excluir") {
          document.getElementById('atualizar').disabled = true;
          document.getElementById('cadastrar').disabled = true;
          document.getElementById('excluir').disabled = false;
        }
      }
      formCadCliente.addEventListener('submit', manipularEnvio);