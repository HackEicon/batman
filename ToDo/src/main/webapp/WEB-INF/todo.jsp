<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <title>Angular Simple ToDo</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="libs/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="libs/bootswatch/lumen/bootstrap.css" />
    <link rel="stylesheet" href="libs/google-code-prettify/bin/prettify.min.css" />
    <link rel="stylesheet" href="styles/main.css">
  </head>
  <body onload="prettyPrint()">

    <main class="container" ng-controller="TasksCtrl">
    

      <div ng-include="'views/includes/header.html'"></div>

      <ng-view></ng-view>

      <div ng-include="'views/includes/footer.html'"></div>

    </main>

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
