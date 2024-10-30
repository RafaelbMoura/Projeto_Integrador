
// Função para buscar e atualizar a lista de pacientes
async function fetchPacientes() {
    const response = await fetch('/paciente'); // Atualiza a rota para obter pacientes
    const pacientes = await response.json();
    const pacientesList = document.getElementById('paciente_list'); // Corrigido para ID correto
    pacientesList.innerHTML = ''; // Limpa a lista atual
    pacientes.forEach(paciente => {
        const li = document.createElement('li');
        li.textContent = `ID: ${paciente.id} - Nome: ${paciente.nome} - Cpf: ${paciente.cpf} - Data de Nascimento: ${paciente.dataNascimento}`;
        pacientesList.appendChild(li);
    });
}

// Chama fetchPacientes ao carregar a página
document.addEventListener('DOMContentLoaded', fetchPacientes);


// Adicionando um listener ao formulário de adição de pacientes
document.getElementById('add-paciente-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('add-nome').value;
    const cpf = document.getElementById('add-cpf').value;
    const dataNascimento = document.getElementById('add-datanascimento').value;

    // Envia os dados do paciente para o servidor
    await fetch('/paciente/postpaciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cpf, dataNascimento })
    });

    // Atualiza a lista de pacientes
    fetchPacientes();

    // Reseta o formulário após o envio
    document.getElementById('add-paciente-form').reset();
});


document.getElementById('getbyid-paciente-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const id = document.getElementById('insert-id').value; // Captura o ID inserido
    const response = await fetch(`/paciente/${id}`); // Requisição para obter o paciente pelo ID

    const pacienteInfo = document.getElementById('paciente-info');
    
    if (response.ok) { // Verifica se a resposta é bem-sucedida
        const paciente = await response.json();
        // "<h3> e "</h3>" utilizado abaixo como forma de demarcar um titulo. funciona mais ou menos como quebras de lina no java
        // testar "<p> e </p>"
        pacienteInfo.innerHTML = `
            <h3>Dados do Paciente</h3>
            Nome: ${paciente.nome}
            CPF: ${paciente.cpf}
            Data de Nascimento: ${paciente.dataNascimento}
        `;
    } else {
        // Exibe mensagem se o paciente não for encontrado
        pacienteInfo.innerHTML = `<p>ID informado nao existente no banco de dados !</p>`;
    }
});


