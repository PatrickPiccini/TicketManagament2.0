package br.com.tkmanager.dbmanip;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.ws.rs.FormParam;

import br.com.tkmanager.models.Chamado;
import br.com.tkmanager.models.Tecnico;

public class Database {
	
	private static final EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("TicketManagament2.0");
	
	public static Tecnico validateTecnico (String nome, String senha) {
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = em.getTransaction();
		Tecnico tec = new Tecnico();
		
		try {
			tr.begin();
			
			try {
				tec = em.createQuery("SELECT tec FROM TECNICO tec WHERE tec.nome = '"+nome+"'" + "AND tec.senha = '"+senha+"'", Tecnico.class).getSingleResult();
			}
			
			catch(NoResultException nr) {
				return null;
			}
		}
		
		finally{
			em.close();
		}
		
		return tec;
	}

	public static Tecnico insertTecnico(String nome, String sobrenome, String senha,  String email, Date nascimento) {
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = em.getTransaction();
		
		Tecnico tec = new Tecnico();
		
		try {
			tr = em.getTransaction();
			tr.begin();
			
			tec.setNome(nome);
			tec.setSobrenome(sobrenome);
			tec.setSenha(senha);
			tec.setEmail(email);
			tec.setNascimento(nascimento);
			
			em.persist(tec);
			tr.commit();
		}
		
		catch (Exception e) {
			if (tr != null) {
				tr.rollback();
			}
			e.printStackTrace();
			return null;
		}
		
		finally {
			em.close();
		}
		
		return tec;
	}
	
	public static Chamado insertChamado(Integer resp, Integer rela, String titu, Character stat, String desc, Character prio, Character impa, Date dtin) {
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = em.getTransaction();
		
		Chamado cha = new Chamado();
		
		try {
			tr.begin();
			
			cha.setResponsavel(resp);
			cha.setRelator(rela);
			cha.setTitulo(titu);
			cha.setStatus(stat);
			cha.setDescricao(desc);
			cha.setPrioridade(prio);
			cha.setImpacto(impa);
			cha.setDtinclusao(dtin);
			
			em.persist(cha);
			tr.commit();
		}
		
		catch(Exception e) {
			if (tr != null) {
				tr.rollback();
			}
			
			e.printStackTrace();
			return null;
		}
		
		finally {
			em.close();
		}
		
		return cha;
	}

	public static List<Chamado> selectChamados(Integer idResp){
		// idResp <= 0  irá retornar todos os chamados da tabela
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = em.getTransaction();
		List<Chamado> lc = null;
		
		try {
			tr.begin();
			
			try {
				if (idResp > 0) { 
					lc = em.createQuery("SELECT cha FROM CHAMADO cha WHERE cha.responsavel = "+ idResp, Chamado.class).getResultList();
				}
				else {
					lc = em.createQuery("SELECT cha FROM CHAMADO cha", Chamado.class).getResultList();
				}
			}
			catch(NoResultException nr) {
				lc = null;
			}
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally {
			em.close();
		}
		
		return lc;
	}
	
	public static List<List> selectTecnico(){
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = em.getTransaction();
		List<Tecnico> lt;
		List<List> ln = new ArrayList<List>();
		
		try {
			tr.begin();
			
			try {
				lt = em.createQuery("SELECT tec FROM TECNICO tec", Tecnico.class).getResultList();
				
				for (Tecnico tec : lt) {
					List<String> tec_aux = new ArrayList<String>();
					tec_aux.add(tec.getId().toString());
					tec_aux.add(tec.getNome()+ " " + tec.getSobrenome());
					ln.add(tec_aux);
				}
			}
			catch(NoResultException nr) {
				ln = null;
			}
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally {
			em.close();
		}
		
		return ln;
	}
	
	
}













