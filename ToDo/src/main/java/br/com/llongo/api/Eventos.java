package br.com.llongo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.llongo.persistence.entities.Evento;
import br.com.llongo.persistence.repository.EventoRepository;

@RestController
@RequestMapping("/api/eventos")
public class Eventos {

	private EventoRepository eventoRepository;

	@Autowired
	public Eventos(EventoRepository eventoRepository) {
		this.eventoRepository = eventoRepository;
	}

	@RequestMapping(method = RequestMethod.GET,headers="Accept=application/json")
	@ResponseStatus(HttpStatus.OK)
	public List<Evento> getAllEventos() {
		List<Evento> findAll = eventoRepository.findAll();
		return findAll;
	}

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Evento getEvento(@PathVariable Integer id) {
    	Evento one = eventoRepository.findOne(id);
    	return one;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/bynome/{nome}")
    public List<Evento> getEventoByTitle(@PathVariable String nome) {
    	List<Evento> one = eventoRepository.findByNome(nome);
    	return one;
    }
	
	@RequestMapping(method = RequestMethod.POST,headers="Accept=application/json")
	public ResponseEntity<Evento> creatEvento(Evento evento, UriComponentsBuilder builder){
		Evento save = eventoRepository.save(evento);
		HttpHeaders headers = new HttpHeaders();
        headers.setLocation(
                builder.path("/aggregators/orders/{id}")
                        .buildAndExpand(save.getId()).toUri());
        return new ResponseEntity<Evento>(save, headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.PUT,headers="Accept=application/json")
	public ResponseEntity<Evento> updateEvento(Evento evento, UriComponentsBuilder builder){
		Evento save = eventoRepository.save(evento);
		HttpHeaders headers = new HttpHeaders();
        headers.setLocation(
                builder.path("/aggregators/orders/{id}")
                        .buildAndExpand(save.getId()).toUri());
        return new ResponseEntity<Evento>(save, headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
    public void deleteEvento(@PathVariable Integer id) {
    	eventoRepository.delete(id);
    }
}
