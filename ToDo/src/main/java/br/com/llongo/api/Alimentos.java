package br.com.llongo.api;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.llongo.persistence.entities.Alimento;
import br.com.llongo.persistence.entities.Evento;
import br.com.llongo.persistence.repository.AlimentoRepository;
import br.com.llongo.persistence.repository.EventoRepository;

@RestController
@RequestMapping("/api/alimentos")
public class Alimentos {

	private AlimentoRepository alimentoRepository;
	private EventoRepository eventoRepository;

	@Autowired
	public Alimentos(AlimentoRepository alimentoRepository,EventoRepository eventoRepository) {
		this.alimentoRepository = alimentoRepository;
		this.eventoRepository = eventoRepository;
	}

	@RequestMapping(method = RequestMethod.GET,headers="Accept=application/json")
	@ResponseStatus(HttpStatus.OK)
	public List<Alimento> getAllAlimentos() {
		List<Alimento> findAll = alimentoRepository.findAll();
		return findAll;
	}

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Alimento getAlimento(@PathVariable Integer id) {
    	Alimento one = alimentoRepository.findOne(id);
    	return one;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/bynome/{nome}")
    public List<Alimento> getAlimentoByTitle(@PathVariable String nome) {
    	List<Alimento> one = alimentoRepository.findByNome(nome);
    	return one;
    }
	
	@RequestMapping(method = RequestMethod.POST,headers="Accept=application/json")
	public ResponseEntity<Alimento> creatAlimento(Alimento alimento, UriComponentsBuilder builder){
		Alimento save = alimentoRepository.save(alimento);
		HttpHeaders headers = new HttpHeaders();
        headers.setLocation(
                builder.path("/aggregators/orders/{id}")
                        .buildAndExpand(save.getId()).toUri());
        return new ResponseEntity<Alimento>(save, headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.PUT,headers="Accept=application/json")
	public ResponseEntity<Alimento> updateAlimento(Alimento alimento, UriComponentsBuilder builder){
		Alimento save = alimentoRepository.save(alimento);
		HttpHeaders headers = new HttpHeaders();
        headers.setLocation(
                builder.path("/aggregators/orders/{id}")
                        .buildAndExpand(save.getId()).toUri());
        return new ResponseEntity<Alimento>(save, headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
    public void deleteAlimento(@PathVariable Integer id) {
    	alimentoRepository.delete(id);
    }
	
	@RequestMapping(value="/cardapio",method = RequestMethod.PUT,headers="Accept=application/json")
	@ResponseStatus(HttpStatus.OK)
	@Transactional
	public void updateCardapio(@RequestParam(value="alimentoId", required=true) int alimentoId, @RequestParam(value="eventoId", required=true) int eventoId, UriComponentsBuilder builder){
		
		Alimento alimento = alimentoRepository.findOne(alimentoId);
		Evento evento = eventoRepository.findOne(eventoId);
		alimento.getEventos().add(evento);
		alimentoRepository.save(alimento);
	}
}
