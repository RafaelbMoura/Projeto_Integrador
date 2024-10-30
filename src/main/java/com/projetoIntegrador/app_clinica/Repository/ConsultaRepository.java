package com.projetoIntegrador.app_clinica.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoIntegrador.app_clinica.Modelo.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

}
