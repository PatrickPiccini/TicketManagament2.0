package br.com.tkmanager.api;

import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Tecnico;
import br.com.tkmanager.dbmanip.Database;

@Path("/getTecnicoNomes")
public class getTecnicoNomes {
	
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTecnicoNomes() throws JSONException{
		JSONObject json = new JSONObject();
		
		List<String> ltn = Database.selectTecnicoNomes();
		
		if (ltn != null) {
			json.put("nomes", ltn.toString());
		}
		else {
			json.put("nomes", "null");
		}
		
		return Response.status(200).entity(json.toString()).build();
	}
}
