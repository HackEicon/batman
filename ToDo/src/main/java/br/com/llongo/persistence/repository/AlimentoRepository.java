package br.com.llongo.persistence.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.llongo.persistence.entities.Alimento;
public interface AlimentoRepository extends JpaRepository<Alimento, Integer>{

	@Override
	@Query("SELECT x FROM Alimento x where  x.id = :id")
	public Alimento findOne(@Param("id") Integer id);

	@Override
	@Transactional
	public Alimento save(Alimento alimento);
	
	public List<Alimento> findByNome(String nome);
	
}
