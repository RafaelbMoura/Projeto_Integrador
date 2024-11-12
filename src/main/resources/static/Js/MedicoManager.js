// Função para buscar e atualizar a lista de médicos
async function fetchMedicos() {
    const response = await fetch('/medico'); // Atualiza a rota para obter médicos
    const medicos = await response.json();
    const medicosList = document.getElementById('medico_list'); // Corrigido para ID correto
    medicosList.innerHTML = ''; // Limpa a lista atual
    medicos.forEach(medico => {
        const li = document.createElement('li');
        li.textContent = `ID: ${medico.id} - Nome: ${medico.nome} - CRM: ${medico.crm} - Especialidade: ${medico.especialidade}`;
        medicosList.appendChild(li);
    });
}

// Chama fetchMedicos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchMedicos);

// Adicionando um listener ao formulário de adição de médicos
document.getElementById('add-medico-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const medicoNome = document.getElementById('add-nome').value;
    const medicoCrm = document.getElementById('add-crm').value;
    const medicoEspecialidade = document.getElementById('add-especialidade').value;

    // Envia os dados do médico para o servidor
    await fetch('/medico/postmedicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // ATENÇÃO AO NOME E ORDEM DOS ATRIBUTOS!!!!!!
        body: JSON.stringify({ nome: medicoNome, crm: medicoCrm, especialidade: medicoEspecialidade })
    });

    // Atualiza a lista de médicos
    fetchMedicos();

    // Reseta o formulário após o envio
    document.getElementById('add-medico-form').reset();
});

// Buscando médico pelo ID
document.getElementById('getbyid-medico-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const id = document.getElementById('insert-id').value; // Captura o ID inserido
    const response = await fetch(`/medico/getmedicosbyid/${id}`); // Requisição para obter o médico pelo ID

    const medicoInfo = document.getElementById('medico-info');

    if (response.ok) { // Verifica se a resposta é bem-sucedida
        const medico = await response.json();
        // Exibe os dados do médico
        medicoInfo.innerHTML = `
            <h3>Dados do Médico</h3>
            Nome: ${medico.nome}
            CRM: ${medico.crm}
            Especialidade: ${medico.especialidade}
        `;
    } else {
        // Exibe mensagem se o médico não for encontrado
        medicoInfo.innerHTML = `<p>ID informado não existe no banco de dados!</p>`;
    }
});

// Excluindo um médico
document.getElementById("exc-medico-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    const medicoId = document.getElementById("medico-id").value;

    await fetch(`/medico/deletemedicos/${medicoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ id: medicoId })
    });

    fetchMedicos();
    document.getElementById('exc-medico-form').reset();
});

// Atualizando os dados de um médico
document.getElementById("update-medico-form").addEventListener('submit', async (e) => {
    e.preventDefault();
    const medicoNome = document.getElementById('update-medico-nome').value;
    const medicoCrm = document.getElementById('update-medico-crm').value;
    const medicoEspecialidade = document.getElementById('update-medico-especialidade').value;
    const medicoId = document.getElementById('update-medico-id').value;

    await fetch(`/medico/putmedicos/${medicoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
        },
        // ATENÇÃO AO NOME E ORDEM DOS ATRIBUTOS!!!!!!
        body: JSON.stringify({ nome: medicoNome, crm: medicoCrm, especialidade: medicoEspecialidade })
    });

    fetchMedicos();
    document.getElementById('update-medico-form').reset();
});
