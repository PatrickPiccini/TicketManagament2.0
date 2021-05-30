package br.com.tkmanager.api;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Tecnico;

@Path("/loginVerifier")
public class loginVerifier {
	
	private static final EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("TicketManagament2.0");
	
	@POST
	@Produces("application/json")
	Response loginVerifier(@PathParam(value="name") String nome, @PathParam(value="password")String senha) throws JSONException{

		JSONObject json = new JSONObject();
		EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();
		EntityTransaction tr = null;
		Tecnico tec = new Tecnico();
		
		try {
			tr = em.getTransaction();
			tr.begin();
			
			tec = em.createQuery("SELECT tec FROM TECNICO tec WHERE tec.id = "+nome+"AND tec.senha = "+senha+";", Tecnico.class).getSingleResult();
			
			if (tec != null) {
				json.append("existresp", true);
				json.append("idtec", tec.getId());
				json.append("processOK", true);
				return Response.status(200).entity(json).build();
			}	
			else {
				json.append("existresp", false);
				json.append("idtec", null);
				json.append("processOK", true);
				return Response.status(200).entity(json).build();
			}
			
		}
		catch(Exception e) {
			if(tr != null) {
				tr.rollback();
			}
			json.append("existresp", false);
			json.append("idtec", null);
			json.append("processOK", false);
			e.printStackTrace();
			return Response.status(200).entity(json).build();
		}
		finally {
			em.close();
		}
		
		
	}

}
