const baseUrl = 'http://localhost:8080/consultas';

// Função para buscar médicos cadastrados
async function fetchMedicos() {
    const response = await fetch('http://localhost:8080/medico');
    const medicos = await response.json();
    const medicoSelects = document.querySelectorAll('#medico-id, #novo-medico-id');
    
    medicoSelects.forEach(select => {
        select.innerHTML = '';  // Limpa a lista antes de preencher
        medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.id;
            option.textContent = medico.nome;
            select.appendChild(option);
        });
    });
}

// Função para buscar pacientes cadastrados
async function fetchPacientes() {
    const response = await fetch('http://localhost:8080/paciente');
    const pacientes = await response.json();
    const pacienteSelects = document.querySelectorAll('#paciente-id, #novo-paciente-id');
    
    pacienteSelects.forEach(select => {
        select.innerHTML = '';  // Limpa a lista antes de preencher
        pacientes.forEach(paciente => {
            const option = document.createElement('option');
            option.value = paciente.id;
            option.textContent = paciente.nome;
            select.appendChild(option);
        });
    });
}

// Função para buscar e exibir as consultas agendadas
async function fetchConsultas() {
    const response = await fetch(baseUrl);
    const consultas = await response.json();
    const consultaList = document.getElementById('consulta-list');
    consultaList.innerHTML = ''; // Limpa a lista de consultas

    consultas.forEach(consulta => {
        const listItem = document.createElement('li');
        listItem.textContent = `Consulta ID: ${consulta.id}, Médico: ${consulta.medico.nome}, Paciente: ${consulta.paciente.nome}, Data: ${new Date(consulta.dataHora).toLocaleString()}`;
        consultaList.appendChild(listItem);
    });
}

// Função para agendar consulta
async function agendarConsulta(event) {
    event.preventDefault();
    const medicoId = document.getElementById('medico-id').value;
    const pacienteId = document.getElementById('paciente-id').value;
    const dataHora = document.getElementById('data-hora').value;

    const consulta = {
        medico: { id: medicoId },
        paciente: { id: pacienteId },
        dataHora
    };

    const response = await fetch(`${baseUrl}/agendar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    });

    if (response.ok) {
        alert('Consulta agendada com sucesso');
        fetchConsultas();
    } else {
        alert('Erro ao agendar consulta');
    }
}

// Função para editar consulta
async function editarConsulta(event) {
    event.preventDefault();
    const consultaId = document.getElementById('consulta-id-editar').value;
    const medicoId = document.getElementById('novo-medico-id').value;
    const pacienteId = document.getElementById('novo-paciente-id').value;
    const dataHora = document.getElementById('nova-data-hora').value;

    const consulta = {
        medico: { id: medicoId },
        paciente: { id: pacienteId },
        dataHora
    };

    const response = await fetch(`${baseUrl}/editar/${consultaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    });

    if (response.ok) {
        alert('Consulta editada com sucesso');
        fetchConsultas();
    } else {
        alert('Erro ao editar consulta');
    }
}

// Função para cancelar consulta
async function cancelarConsulta(event) {
    event.preventDefault();
    const consultaId = document.getElementById('consulta-id-cancelar').value;

    const confirmCancel = confirm("Tem certeza que deseja cancelar esta consulta?");
    if (confirmCancel) {
        const response = await fetch(`${baseUrl}/cancelar/${consultaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Consulta cancelada com sucesso');
            fetchConsultas();
        } else {
            alert('Erro ao cancelar consulta');
        }
    }
}

// Inicialização dos formulários e das listas
document.getElementById('agendar-consulta-form').addEventListener('submit', agendarConsulta);
document.getElementById('editar-consulta-form').addEventListener('submit', editarConsulta);
document.getElementById('cancelar-consulta-form').addEventListener('submit', cancelarConsulta);

// Carrega médicos, pacientes e consultas ao abrir a página
window.onload = () => {
    fetchMedicos();
    fetchPacientes();
    fetchConsultas();
};
