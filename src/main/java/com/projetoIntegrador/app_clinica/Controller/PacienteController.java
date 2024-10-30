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

import com.projetoIntegrador.app_clinica.Modelo.Paciente;
import com.projetoIntegrador.app_clinica.Service.PacienteService;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    
    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public List<Paciente> getAllPacientes() {
        return pacienteService.getAllPacientes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> getPacienteById(@PathVariable Long id) {
        return pacienteService.getPacienteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/postpaciente")
    public ResponseEntity<Paciente> createPaciente(@RequestBody Paciente paciente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.savePaciente(paciente));
    }

    @PutMapping("/putpaciente/{id}")
    public ResponseEntity<Paciente> updatePaciente(@PathVariable Long id, @RequestBody Paciente paciente) {
        return ResponseEntity.ok(pacienteService.updatePaciente(id, paciente));
    }

    @DeleteMapping("/deletepaciente/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return ResponseEntity.noContent().build();
    }

}
