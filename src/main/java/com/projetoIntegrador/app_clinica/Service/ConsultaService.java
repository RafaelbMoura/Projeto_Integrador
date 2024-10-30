package com.projetoIntegrador.app_clinica.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoIntegrador.app_clinica.Modelo.Consulta;
import com.projetoIntegrador.app_clinica.Repository.ConsultaRepository;

@Service
public class ConsultaService {
   
    @Autowired
    private ConsultaRepository consultaRepository;

    public List<Consulta> getAllConsultas() {
        return consultaRepository.findAll();
    }

    public Optional<Consulta> getConsultaById(Long id) {
        return consultaRepository.findById(id);
    }

    public Consulta agendarConsulta(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    public Consulta editarConsulta(Long id, Consulta consultaAtualizada) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
        consulta.setDataHora(consultaAtualizada.getDataHora());
        consulta.setStatus(consultaAtualizada.getStatus());
        consulta.setMedico(consultaAtualizada.getMedico());
        consulta.setPaciente(consultaAtualizada.getPaciente());
        return consultaRepository.save(consulta);
    }

    public void cancelarConsulta(Long id) {
        consultaRepository.deleteById(id);
    }
}
