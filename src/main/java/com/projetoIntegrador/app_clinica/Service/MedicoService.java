package com.projetoIntegrador.app_clinica.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoIntegrador.app_clinica.Modelo.Medico;
import com.projetoIntegrador.app_clinica.Repository.MedicoRepository;

@Service
public class MedicoService {
    
    @Autowired
    private MedicoRepository medicoRepository;

    public List<Medico> getAllMedicos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> getMedicoById(Long id) {
        return medicoRepository.findById(id);
    }

    public Medico saveMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    public Medico updateMedico(Long id, Medico medicoAtualizado) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        medico.setNome(medicoAtualizado.getNome());
        medico.setCrm(medicoAtualizado.getCrm());
        medico.setEspecialidade(medicoAtualizado.getEspecialidade());
        return medicoRepository.save(medico);
    }

    public void deleteMedico(Long id){
        medicoRepository.deleteById(id);
    }

}
