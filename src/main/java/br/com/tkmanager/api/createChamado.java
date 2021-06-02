package br.com.tkmanager.api;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Chamado;
import br.com.tkmanager.dbmanip.Database;

import javax.persistence.*;

import java.util.Date;


@Path("/createChamado")
public class createChamado {

	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createChamado(@FormParam("responsavel") Integer responsavel, @FormParam("relator") Integer relator,@FormParam("titulo") String titulo,@FormParam("status") Character status,@FormParam("descricao") String descricao,@FormParam("prioridade") Character prioridade,@FormParam("impacto") Character impacto, @FormParam("dtinicio") Date dtinicio) throws JSONException{
		
		JSONObject json = new JSONObject();
		
		Chamado cha = Database.insertChamado(responsavel, relator, titulo, status, descricao, prioridade, impacto, dtinicio);
		
		if (cha != null) {
			json.put("idChamado", cha.getIdchamado());
			}
			else {
			json.put("idChamado", "null");
			}
		
		return Response.status(200).entity(json.toString(2)).build();
		
	}
}
