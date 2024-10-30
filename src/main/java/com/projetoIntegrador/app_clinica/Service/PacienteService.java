package com.projetoIntegrador.app_clinica.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoIntegrador.app_clinica.Modelo.Paciente;
import com.projetoIntegrador.app_clinica.Repository.PacienteRepository;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> getPacienteById(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente savePaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public Paciente updatePaciente(Long id, Paciente pacienteAtualizado) {
        /*
         * tentaremos encontrar o paciente no banco de dados através do ID, caso ele não
         * seja encontrado, uma mensagem será disparada, caso encontre, as alterações serão 
         * feitas através de métodos set da classe paciente
         */
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        paciente.setNome(pacienteAtualizado.getNome());
        paciente.setCpf(pacienteAtualizado.getCpf());
        paciente.setDataNascimento(pacienteAtualizado.getDataNascimento());
        return pacienteRepository.save(paciente);
    }

    public void deletePaciente(Long id){
        pacienteRepository.deleteById(id);
    }

}
