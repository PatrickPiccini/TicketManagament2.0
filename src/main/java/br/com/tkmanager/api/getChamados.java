package br.com.tkmanager.api;

import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Chamado;
import br.com.tkmanager.models.Tecnico;
import br.com.tkmanager.dbmanip.Database;

@Path("/getChamados")
public class getChamados {
	
	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChamadosPerTecnico(@FormParam("idResp") Integer idResp) throws JSONException{
		JSONObject json = new JSONObject();
		
		List<Chamado> lc = Database.selectChamados(idResp);
		
		
		json.put("chamados", lc.toString());
		
		/*
		if (lc != null) {
			for (Chamado cha : lc) {
				
			}
		}*/
		
		return Response.status(200).entity(json.toString()).build();
		
	}

}
