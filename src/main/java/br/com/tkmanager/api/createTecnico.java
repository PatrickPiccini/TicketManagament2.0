package br.com.tkmanager.api;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Tecnico;
import br.com.tkmanager.api.loginValidation;
import br.com.tkmanager.dbmanip.Database;

import javax.persistence.*;

import java.util.Date;

@Path("/createTecnico")
public class createTecnico {
	private static final EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("TicketManagament2.0");
	
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTecnico(@FormParam("nome") String nome, @FormParam("sobrenome") String sobrenome, @FormParam("senha") String senha, @FormParam("email") String email, @FormParam("nascimento") Date nascimento) throws JSONException{
		JSONObject json = new JSONObject();
		
		Tecnico tec = Database.insertTecnico(nome, sobrenome, senha, email, nascimento);
		
		if (tec != null) {
		json.put("idTecnico", tec.getId());
		}
		else {
		json.put("idTecnico", "null");
		}
	
		
		return Response.status(200).entity(json.toString(2)).build();
		
	}
}
