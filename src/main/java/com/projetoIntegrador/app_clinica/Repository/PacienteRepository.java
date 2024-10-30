package com.projetoIntegrador.app_clinica.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoIntegrador.app_clinica.Modelo.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente,Long> {
    
}
