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

import com.projetoIntegrador.app_clinica.Modelo.Medico;
import com.projetoIntegrador.app_clinica.Service.MedicoService;

@RestController
@RequestMapping("/medico")
public class MedicoController {
    
    @Autowired
    private MedicoService medicoService;

    @GetMapping
    public List<Medico> getAllMedicos() {
        return medicoService.getAllMedicos();
    }

    @GetMapping("/getmedicosbyid/{id}")
    public ResponseEntity<Medico> getMedicoById(@PathVariable Long id) {
        return medicoService.getMedicoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/postmedicos")
    public ResponseEntity<Medico> createMedico(@RequestBody Medico medico) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.saveMedico(medico));
    }

    @PutMapping("/putmedicos/{id}")
    public ResponseEntity<Medico> updateMedico(@PathVariable Long id, @RequestBody Medico medico) {
        return ResponseEntity.ok(medicoService.updateMedico(id, medico));
    }

    @DeleteMapping("/deletemedicos/{id}")
    public ResponseEntity<Void> deleteMedico(@PathVariable Long id) {
        medicoService.deleteMedico(id);
        return ResponseEntity.noContent().build();
    }
}
