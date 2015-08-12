package br.com.llongo.persistence.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


@Entity
@Table(name="alimento")
public class Alimento implements Serializable {
	public Alimento() {
	}
	private static final long serialVersionUID = 7185813866142443643L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column
	private String nome;
	@Column
	private String foto;
	@Column
	private Float valor;
	@Column
	private Boolean ativo;
	@Column
	private Boolean recorrente;
	@Column
	private String descricao;
	@Column
	private String categoria;
	
	
	 @ManyToMany(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	 @JoinTable(name = "alimento_evento", joinColumns = @JoinColumn(name = "alimento_id"), 
	 inverseJoinColumns = @JoinColumn(name = "evento_id"))
	private Set<Evento> eventos = new HashSet<Evento>();
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	public Float getValor() {
		return valor;
	}
	public void setValor(Float valor) {
		this.valor = valor;
	}
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
	public Boolean getRecorrente() {
		return recorrente;
	}
	public void setRecorrente(Boolean recorrente) {
		this.recorrente = recorrente;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Set<Evento> getEventos() {
		return eventos;
	}
	public void setEventos(Set<Evento> eventos) {
		this.eventos = eventos;
	}
	
	public Alimento(String nome, String foto, Float valor,
			Boolean ativo, Boolean recorrente, String descricao,String categoria) {
		super();
		this.nome = nome;
		this.foto = foto;
		this.valor = valor;
		this.ativo = ativo;
		this.recorrente = recorrente;
		this.descricao = descricao;
		this.categoria = categoria;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
}
