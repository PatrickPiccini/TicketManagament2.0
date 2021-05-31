package br.com.tkmanager.dbmanip;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.ws.rs.FormParam;

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
}
