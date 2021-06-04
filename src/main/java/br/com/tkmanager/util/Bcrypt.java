package br.com.tkmanager.util;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class Bcrypt {
	
	public static String hashPass(String senha) {
		return BCrypt.hashpw(senha, BCrypt.gensalt(10));
	}
	
	public static Boolean passwordVerifier(String senhaInserida, String senhaArmazenada) {
		
		if (BCrypt.checkpw(senhaInserida, senhaArmazenada)) {
			return true;
		}
		else {
			return false;
		}
		
	}
}
