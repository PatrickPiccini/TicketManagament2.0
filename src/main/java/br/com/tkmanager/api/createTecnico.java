package br.com.tkmanager.api;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Tecnico;
import br.com.tkmanager.util.Bcrypt;
import br.com.tkmanager.dbmanip.Database;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Path("/createTecnico")
public class createTecnico {
		
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTecnico(@FormParam("nome") String nome, @FormParam("sobrenome") String sobrenome, @FormParam("senha") String senha, @FormParam("email") String email) throws JSONException{
		JSONObject json = new JSONObject();
		Tecnico tec = new Tecnico();
		Date data = new Date(System.currentTimeMillis());
		
		
		boolean existeTecnico = Database.haveTecnico(nome, sobrenome);
		if (!existeTecnico) {
			tec = Database.insertTecnico(nome, sobrenome, Bcrypt.hashPass(senha), email, data);
		}
		else {
			tec = null;
		}
		
		if (tec != null) {
		json.put("idTecnico", tec.getId());
		}
		else {
		json.put("idTecnico", "null");
		}
	
		
		return Response.status(200).entity(json.toString(2)).build();
		
	}
}
