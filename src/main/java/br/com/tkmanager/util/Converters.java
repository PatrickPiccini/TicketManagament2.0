package br.com.tkmanager.util;

public class Converters {
	public static Character status(String stat) {
		Character ret;
		
		if (stat.equals("Cancelado")) {
			ret = 'C';
		}
		else if (stat.equals("EmProgresso")) {
			ret = 'P';
		}
		else if(stat.equals("Concluído")) {
			ret = 'F';
		}
		else if(stat.equals("AguardandoTerceiros")) {
			ret = 'A';
		}
		else {
			ret = null;
		}
		
		return ret;
	}
	
	
	public static Character prioridade(String prio) {
		Character ret;
		
		if (prio.equals("Prioridade1")) {
			ret = '1';
		}
		else if (prio.equals("Prioridade2")) {
			ret = '2';
		}
		else if(prio.equals("Prioridade3")) {
			ret = '3';
		}
		else if(prio.equals("Prioridade4")) {
			ret = '4';
		}
		else {
			ret = null;
		}
		
		return ret;
	}
	
	
	public static Character impacto(String prio) {
		Character ret;
		
		if (prio.equals("Critico")) {
			ret = 'C';
		}
		else if (prio.equals("Alto")) {
			ret = 'A';
		}
		else if(prio.equals("Medio")) {
			ret = 'M';
		}
		else if(prio.equals("Baixo")) {
			ret = 'B';
		}
		else {
			ret = null;
		}
		
		return ret;
	}
}

/*
--STATUS: 
    --C - Cancelado
    --P - Em Progresso
    --F - Concluído
    --A - Aguardando Terceiros

--Prioridade: 
    -- 1 é a menor
    -- 4 é a maior

--Impacto:
    -- C - Critico
    -- A - Alto
    -- M - Médio
    -- B - Baixo
 */
