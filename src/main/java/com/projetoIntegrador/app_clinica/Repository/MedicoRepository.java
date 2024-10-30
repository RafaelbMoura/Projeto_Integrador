package com.projetoIntegrador.app_clinica.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoIntegrador.app_clinica.Modelo.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    
}
