<%@page import="com.massa.models.Chamado"%>
<%@page import="com.sun.jdi.Type"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.massa.servlet.Servlet"%>
<%@page import="com.massa.dbutilities.BDManip"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" href="./../CSS_Styles/home.css">
<title>Insert title here</title>
</head>
<body>
	<input type="checkbox" class='checkMenu' id="menu">
	<label for="menu" class='icone'>
		<div class='circle'></div>
		<div class="buttonMenu">
			<img src="Background/IconMenu.png" alt="IconMenu">
		</div>
		</div>
	</label>
	<nav class='retangleMenu'>
		</label>
		<ul class='UlMenu'>
			<h2 class='title'>Ticket Management</h2>
			<li class='intesMenu'><a href="" class='blocksLinks'>HOME</a></li>
			<li class='intesMenu'><a href="" class='blocksLinks'>CREATE
					TICKETS</a></li>
			<li class='intesMenu'><a href="" class='blocksLinks'>MY
					TICKETS</a></li>
			<li class='intesMenu'><a href="" class='blocksLinks'>SETTINGS</a></li>
			<li class='intesMenu'><a href="" class='blocksLinks'>ALGUMACOISA</a></li>
		</ul>
	</nav>
	<header class='cabecalho'>
		<div class='infoHeadrer'>
			<img src="Background/icon.png" alt="">
			<h2 id='wlc'>Bem Vindo!</h2>
		</div>
	</header>
	<main class='infosMain'>
		<%
		Integer idTecnico = Integer.parseInt(request.getParameter("idTecnico"));
		ArrayList<Chamado> c = BDManip.viewTickets(idTecnico);

		for (Chamado chamado : c) {
		%>

		<form class='centralinfos'>
			<div class='chamado' <%%>>
				<h3 class="titleID">ID:
					<%
				out.print(chamado.getIdChamado());
				%>
				</h3>
				<label for="descInfo" class="titleDesc">Descricao:</label>
				<p class="descInfo">
					<%
					out.print(chamado.getDescricao());
					%>
				</p>
			</div>
		</form>

		<%
		}
		%>

	</main>

</body>

</html>