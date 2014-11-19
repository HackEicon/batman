<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <title>Cardapio - Restaurante</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="libs/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="styles/style.css">
  </head>
  <body onload="prettyPrint()" ng-controller="RestauranteCtrl">

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Cardapio</a>
        </div>
        <div class="navbar-collapse collapse">
       		<ul class="nav navbar-nav navbar-right">
	          <li ng-show="ambientePublico" class="ng-hide"><a href="#/composicao">Administrativo</a></li>
	          <li ng-show="!ambientePublico" class="ng-hide"><a href="#/cardapio">Publico</a></li>
	        </ul>
	    </div>
      </div>
    </div>


    <div class="container-fluid">
      <div class="row">
        

        <!-- Sidebar -->
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li ng-repeat="menu in menuInterno" ng-class="{'active' : menu.nome==selectedMenu.nome}" ng-show="!ambientePublico" class="ng-hide">
              <a href="#/{{menu.uri}}">{{menu.nome}}</a>
            </li>
            <li ng-repeat="menu in eventos" ng-class="{'active' : menu.nome==nomeEvento}" ng-show="ambientePublico" class="ng-hide">
              <a href="" ng-click="selectEvento(menu.nome, menu.id)">{{menu.nome}}</a>
            </li>
          </ul>
        </div>

        <!-- Main Content -->
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

          <ng-view></ng-view>
        
        </div>
      </div>
      
    </div>

    <!-- dependencies -->
    <script src="libs/jquery/dist/jquery.js"></script>
    <script src="libs/angular/angular.js"></script>
    <script src="libs/angular-route/angular-route.js"></script>
    <script src="libs/angular-animate/angular-animate.js"></script>
    <script src="libs/bootstrap/dist/js/bootstrap.js"></script>
    <script src="libs/google-code-prettify/bin/prettify.min.js"></script>

    <!-- app -->
    <script src="scripts/services.js"></script>
    <script src="scripts/controllers.js"></script>
    <script src="scripts/directives.js"></script>
    <script src="scripts/app.js"></script>

</body>
</html>


