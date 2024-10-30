
// Função para buscar e atualizar a lista de pacientes
async function fetchPacientes() {
    const response = await fetch('/paciente'); // Atualiza a rota para obter pacientes
    const pacientes = await response.json();
    const pacientesList = document.getElementById('paciente_list'); // Corrigido para ID correto
    pacientesList.innerHTML = ''; // Limpa a lista atual
    pacientes.forEach(paciente => {
        const li = document.createElement('li');
        li.textContent = `Nome: ${paciente.nome} - Cpf: ${paciente.cpf} - Data de Nascimento: ${paciente.dataNascimento}`;
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


