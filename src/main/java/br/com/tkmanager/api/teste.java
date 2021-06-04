package br.com.tkmanager.api;

import br.com.tkmanager.dbmanip.Database;
import br.com.tkmanager.models.Tecnico;
import br.com.tkmanager.util.Bcrypt;

public class teste {
	
	
	public static void main(String[] args) {
		String senha = "cabeca";
		
		System.out.println(Bcrypt.hashPass(senha));

	}

}
