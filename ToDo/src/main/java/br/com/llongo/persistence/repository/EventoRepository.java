package br.com.llongo.persistence.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.llongo.persistence.entities.Evento;
public interface EventoRepository extends JpaRepository<Evento, Integer>{

	@Override
	@Query("SELECT x FROM Evento x where  x.id = :id")
	public Evento findOne(@Param("id") Integer id);

	@Override
	@Transactional
	public Evento save(Evento evento);
	
	public List<Evento> findByNome(String nome);
	
}
