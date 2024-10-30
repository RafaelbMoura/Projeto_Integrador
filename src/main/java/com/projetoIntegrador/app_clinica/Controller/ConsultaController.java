package com.projetoIntegrador.app_clinica.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoIntegrador.app_clinica.Modelo.Consulta;
import com.projetoIntegrador.app_clinica.Modelo.Medico;
import com.projetoIntegrador.app_clinica.Modelo.Paciente;
import com.projetoIntegrador.app_clinica.Service.ConsultaService;
import com.projetoIntegrador.app_clinica.Service.MedicoService;
import com.projetoIntegrador.app_clinica.Service.PacienteService;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {
    
    @Autowired
    private ConsultaService consultaService;

    @Autowired
    private MedicoService medicoService;
    
    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public List<Consulta> getAllConsultas() {
        return consultaService.getAllConsultas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> getConsultaById(@PathVariable Long id) {
        return consultaService.getConsultaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/agendar")
    public ResponseEntity<Consulta> agendarConsulta(@RequestBody Consulta consulta) {
        // Busca o médico e o paciente pelo ID na instância de Consulta
        Medico medico = medicoService.getMedicoById(consulta.getMedico().getId())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado"));
        Paciente paciente = pacienteService.getPacienteById(consulta.getPaciente().getId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        // Define os objetos completos em consulta
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);

        return ResponseEntity.status(HttpStatus.CREATED).body(consultaService.agendarConsulta(consulta));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Consulta> editarConsulta(@PathVariable Long id, @RequestBody Consulta consulta) {
        return ResponseEntity.ok(consultaService.editarConsulta(id, consulta));
    }

    @DeleteMapping("/cancelar/{id}")
    public ResponseEntity<Void> cancelarConsulta(@PathVariable Long id) {
        consultaService.cancelarConsulta(id);
        return ResponseEntity.noContent().build();
    }

}
