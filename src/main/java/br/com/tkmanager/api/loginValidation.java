package br.com.tkmanager.api;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.glassfish.jersey.server.ContainerRequest;
import org.glassfish.jersey.server.ContainerResponse;
import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Tecnico;

@Path("/loginValidation")
public class loginValidation {
	
	private static final EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("TicketManagament2.0");

	@GET
	@Produces("application/json; charset=UTF-8")
	@Path("{nome}-{senha}")
	public Response loginValidation(@PathParam("nome") String nome, @PathParam("senha") String senha) throws JSONException{
		//

		JSONObject json = new JSONObject();
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = null;
		Tecnico tec = new Tecnico();
		
		String teste;
		
		try {
			tr = em.getTransaction();
			tr.begin();
			
			try {
				tec = em.createQuery("SELECT tec FROM TECNICO tec WHERE tec.nome = '"+nome+"'" + "AND tec.senha = '"+senha+"'", Tecnico.class).getSingleResult();}
			catch (NoResultException e) {
				tec = null;
			}
			 
			if (tec != null) {
				json.put("existresp", true);
				json.put("idtec", tec.getId());
				json.put("processOK", true);
				teste = "o json é esse ak:"+json;
				return Response.status(200).entity(teste).build();
			}	
			else {
				json.put("existresp", false);
				json.put("idtec", "null");
				json.put("processOK", true);
				teste = "o json é esse ak:"+json;
				return Response.status(200).entity(teste).build();

			}
			
		}
		catch(Exception e) {
			if(tr != null) {
				tr.rollback();
			}
			json.put("existresp", false);
			json.put("idtec", "null");
			json.put("processOK", false);
			e.printStackTrace();
			teste = "o json é esse ak:"+json;
			return Response.status(200).entity(teste).build();
		}
		finally {
			em.close();
		}		
	}
	
}
