package br.com.tkmanager.api;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.json.JSONException;
import org.json.JSONObject;

import br.com.tkmanager.models.Chamado;
import br.com.tkmanager.util.Converters;
import br.com.tkmanager.dbmanip.Database;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Path("/createChamado")
public class createChamado {

	@POST
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createChamado(@FormParam("responsavel") String responsavel, @FormParam("relator") String relator,@FormParam("titulo") String titulo,@FormParam("status") String status,@FormParam("descricao") String descricao,@FormParam("prioridade") String prioridade,@FormParam("impacto") String impacto, @FormParam("dtinicio") String dtinicio) throws JSONException, NumberFormatException, ParseException{
		
		responsavel = responsavel.replace("\n", "");
		responsavel = responsavel.replace(" ", "");
		
		relator = relator.replace("\n", "");
		relator = relator.replace(" ", "");
		
		titulo = titulo.replace("\n", "");
		
		status = status.replace("\n", "");
		status = status.replace(" ", "");
		
		prioridade = prioridade.replace("\n", "");
		prioridade = prioridade.replace(" ", "");
		
		impacto = impacto.replace("\n", "");
		impacto = impacto.replace(" ", "");

		JSONObject json = new JSONObject();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date data = format.parse(dtinicio);


		Chamado cha = Database.insertChamado(Integer.valueOf(responsavel), Integer.valueOf(relator), titulo, Converters.status(status), descricao, Converters.prioridade(prioridade), Converters.impacto(impacto), data);
		
		if (cha != null) {
			json.put("idChamado", cha.getIdchamado());
			}
			else {
			json.put("idChamado", "null");
			}
		
		return Response.status(200).entity(json.toString(2)).build();
		
	}
}
