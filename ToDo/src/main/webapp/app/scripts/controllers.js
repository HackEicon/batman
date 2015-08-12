'use strict';

angular
  .module('app.controllers', [])
  .controller('TasksCtrl', ['$scope', '$routeParams', 'TasksFactory'
    , function($scope, $routeParams, TasksFactory){

    $scope.filterAll = true;
    $scope.showAddTask = false;

    TasksFactory.getTasks()
      .then(function () {
        $scope.tasks = TasksFactory.tasks;
      });

    $scope.task = {};

    $scope.$on('$routeChangeSuccess', function () {
      var status = $scope.status = $routeParams.status || '';

      $scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;
    });

    $scope.addTask = function () {
      
      TasksFactory.createTask($scope.task);
      $scope.tasks.push($scope.task);
      $scope.task = {};

    };

    $scope.removeTask = function (item) {

      $scope.tasks.splice($scope.tasks.indexOf(item), 1);

    };

    $scope.editTask = function (item) {

      item.editing = true;
      $scope.originalTask = angular.extend({}, item);

    };

    $scope.doneEditingTask = function (item) {

      item.editing = false;

    };

    $scope.cancelEdit = function ($event, item) {

      if ($event.keyCode !== 27) return;

      $scope.tasks[$scope.tasks.indexOf(item)] = $scope.originalTask;
      item.editing = false;

    };

  }])
  .controller('ExamplesCtrl', ['$scope', '$rootScope', 'TasksFactory'
    , function($scope, $rootScope, TasksFactory){

    $rootScope.myTitle = 'Title outside';
    $scope.myTitle = 'Awesome Title.... put your title here!';

    TasksFactory.getTasks()
      .then(function () {
        $scope.tasks = TasksFactory.tasks;
      });

    $scope.alertUser = function () {
      alert('Hey! ' + $scope.myTitle);
    };

    $scope.keydownUser = function ($event) {

      $scope.keydownDebug = $event;
    };

  }])
  .controller('RestauranteCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'TasksFactory'
    , function($scope, $rootScope, $routeParams, $http, TasksFactory){

    $scope.$on('$routeChangeSuccess', function(event, current) {
      $scope.uri = $routeParams.menu || '';
      $scope.setSidebarSelectedByMenuView($scope.uri);
      if($scope.uri === 'cardapio'){
        $scope.ambientePublico = true;
      }else{
        $scope.ambientePublico = false;
      }
    });  

    $scope.menuInterno = [
      {nome: 'Menu do dia', uri: 'composicao'},
      {nome: 'Alimentos', uri: 'alimento'},
      {nome: 'Eventos', uri: 'evento'}
    ];

    $scope.getEventos = function(callback){
      $http.get('api/eventos').success(function(data){
        $scope.eventos = data;
        callback();
      });
    }

    

    
    /*
    * Tratar a view de alimentos
    */

    $scope.alimento = {
      id: null,
      nome: null,
      foto: null,
      valor: null,
      descricao: null
    };

    $scope.clearAlimento = function(){
      $scope.alimento = {
        id: null,
        nome: null,
        foto: null,
        valor: null,
        descricao: null
      };
    }

    $scope.getAlimentos = function(callback){
       $http.get('api/alimentos').success(function(data){
         $scope.alimentos = data;
//         callback();
       });
//      $scope.alimentos = [
//        { id: 1, nome: 'Nome do alimento 1', foto: 'dish1.jpg', valor: '9,99', descricao: 'Descrição do produto, composição da refeição ou outra informação relevante.'},
//        { id: 2, nome: 'Nome do alimento 2', foto: 'dish2.jpg', valor: '10,99', descricao: 'Descrição do produto, composição da refeição ou outra informação relevante.'},
//        { id: 3, nome: 'Nome do alimento 3', foto: 'dish3.jpg', valor: '13,30', descricao: 'Descrição do produto, composição da refeição ou outra informação relevante.'},
//        { id: 4, nome: 'Nome do alimento 4', foto: 'dish4.jpg', valor: '15,00', descricao: 'Descrição do produto, composição da refeição ou outra informação relevante.'},
//        { id: 5, nome: 'Nome do alimento 5', foto: 'dish13.jpg', valor: '1,99', descricao: 'Descrição do produto, composição da refeição ou outra informação relevante.'}
//      ];
  
    }

    $scope.editAlimento = function(index){
      $scope.alimento = $scope.alimentos[index];
    }

    $scope.removeAlimento = function(index){
      var confirma = confirm("Realmente deseja remover '"+$scope.alimentos[index].nome+"'");
      if(confirma){
         $http.delete('api/alimentos/'+$scope.alimentos[index].id).success(function(data){
           $scope.alimentos.splice(index);
         });
        $scope.alimentos.splice(index);
      }
    }

    $scope.salvarAlimento = function(){
      if($scope.alimento.id === null){
        this.insereAlimento($scope.alimento);
      }else{
        this.atualizaAlimento($scope.alimento);
      }
    }

    $scope.insereAlimento = function(alimento){
       $http.post('api/alimentos', alimento).success(function(data){
         
         $scope.alimentos.push(data);
       });
//      alimento.id = $scope.alimentos[$scope.alimen/tos.length - 1].id + 1;  //comentar quando gerando pelo banco
//      $scope.alimentos.push(alimento);
    }

    $scope.atualizaAlimento = function(alimento){
       return $http.put('api/alimentos', alimento);
//      for (var i in $scope.alimentos) {
//         if ($scope.alimentos[i].id == alimento.id) {
//            $scope.alimentos[i] = alimento;
//            break; //Stop this loop, we found it!
//         }
//       }
    }






    /*
    * Tratar a view de eventos
    */

    $scope.evento = {
      id: null,
      nome: null
    };

    $scope.clearEvento = function(){
      $scope.evento = {
        id: null,
        nome: null
      };
    }

    $scope.getEventos = function(callback){
      $http.get('api/eventos').success(function(data){
        $scope.eventos = data;
        $scope.eventoSelecionado = $scope.eventos[0];
        callback();
      });
      // $scope.eventos = [
      //   { id: 1, nome: 'Almoço'},
      //   { id: 2, nome: 'café'},
      // ];
  
    }

    $scope.editEvento = function(index){
      $scope.evento = $scope.eventos[index];
    }

    $scope.removeEvento = function(index){
      var confirma = confirm("Realmente deseja remover '"+$scope.eventos[index].nome+"'");
      if(confirma){
         $http.delete('api/eventos/'+$scope.eventos[index].id).success(function(data){
           $scope.eventos.splice(index);
         });
        $scope.eventos.splice(index);
      }
    }

    $scope.salvarEvento = function(){
      if($scope.evento.id === null){
        this.insereEvento($scope.evento);
      }else{
        this.atualizaEvento($scope.evento);
      }
    }

    $scope.insereEvento = function(evento){
       $http.post('api/eventos', evento).success(function(data){
         $scope.eventos.push(data);
       });
//      evento.id = $scope.eventos[$scope.eventos.length - 1].id + 1;  //comentar quando gerando pelo banco
      $scope.eventos.push(evento);
    }

    $scope.atualizaEvento = function(evento){
       $http.put('api/eventos', evento).success(function(data){
         
         $scope.eventos.push(data);
       });
      for (var i in $scope.eventos) {
         if ($scope.eventos[i].id == evento.id) {
            $scope.eventos[i] = evento;
            break; //Stop this loop, we found it!
         }
       }
    }



    /*
    * Tratar o cardapio
    */

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

    // Compute the intersection of n arrays
    Array.prototype.intersect = function() {
      if (!arguments.length)
        return [];
      var a1 = this;
      var a = null, a2 = a;
      var n = 0;
      while(n < arguments.length) {
        a = [];
        a2 = arguments[n];
        var l = a1.length;
        var l2 = a2.length;
        for(var i=0; i<l; i++) {
          for(var j=0; j<l2; j++) {
            if (a1[i] === a2[j])
              a.push(a1[i]);
          }
        }
        a1 = a;
        n++;
      }
      return a.unique();
    };

    // Return new array with duplicate values removed
    Array.prototype.unique = function() {
      var a = [];
      var l = this.length;
      for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
          // If this[i] is found later in the array
          if (this[i] === this[j])
            j = ++i;
        }
        a.push(this[i]);
      }
      return a;
    };


    $scope.alimentos = [
     
    ]

    $scope.cardapio = [
     
    ];

     $scope.insereAlimentoCardapio = function(alimento){
    	 alimento.eventos.push($scope.eventoSelecionado);
    	 $scope.atualizaAlimento(alimento)
	    	 .success(function(data){
	         });
    }

    $scope.removeAlimentoCardapio = function(alimento){
            alimento.eventos.splice(alimento.eventos.indexOf($scope.eventoSelecionado), 1);
            $scope.atualizaAlimento(alimento)
	            .success(function(data){
	            });
    }

    $scope.filtraAlimentosDisponiveisCardapio = function(){
      var alimentosNoEventoAtual = [];
      //Cria um array com os alimentos que não estão no Cardapio de outro evento
      for (var i in $scope.cardapio) {
         if ($scope.cardapio[i].eventoId === $scope.idEvento) {
            alimentosNoEventoAtual.push($scope.cardapio[i].alimentoId);
         }
      }
      
      //Cria um array somente com o ID de todos os alimentos     
      var alimentosId = []; 
      for (var i in $scope.alimentos) {
        alimentosId.push($scope.alimentos[i].id);
      }
      return alimentosId.diff(alimentosNoEventoAtual);
    };
    $scope.selectEvento = function(nomeEvento, idEvento, evento){
        if(typeof nomeEvento === 'undefined'){
          $scope.nomeEvento = $scope.eventos[0].nome;
          $scope.idEvento = $scope.eventos[0].id;
        }else{
          $scope.nomeEvento = nomeEvento;
          $scope.idEvento = idEvento;
          $scope.eventoSelecionado = evento;
        }
        $scope.filtraAlimentosNaoDisponiveisCardapio();
      };
    $scope.filtraAlimentosNaoDisponiveisCardapio = function(){
      var alimentosNoEventoAtual = [];
      //Cria um array com os alimentos que não estão no Cardapio de outro evento
      for (var i in $scope.cardapio) {
         if ($scope.cardapio[i].eventoId === $scope.idEvento) {
            alimentosNoEventoAtual.push($scope.cardapio[i].alimentoId);
         }
      }
      
      //Cria um array somente com o ID de todos os alimentos     
      var alimentosId = []; 
      for (var i in $scope.alimentos) {
        alimentosId.push($scope.alimentos[i].id);
      }

      return alimentosId.intersect(alimentosNoEventoAtual);
    };

    //Filtro
    $scope.disponivel = function(item) {
      var disponivel = $scope.filtraAlimentosDisponiveisCardapio();
      for (var i in disponivel) {
        if(disponivel[i] === item.id){
          return true;
        }
      }
      return false;
    };

    //Filtro
    $scope.indisponivel = function(item) {
      var indisponivel = $scope.filtraAlimentosNaoDisponiveisCardapio();
      for (var i in indisponivel) {
        if(indisponivel[i] === item.id){
          return true;
        }
      }
      return false;
    };

    // Itera no array de menus e seta como selecionado o item referente ao parâmetro passado via URL.
    $scope.setSidebarSelectedByMenuView = function(menuView){
      angular.forEach($scope.menuInterno, function(value, key) {
        if(value.uri == menuView){
          this.selectedMenu = value;
        }
        if(!$scope.$$phase) $scope.$digest();
      }, $scope);
    };

    $scope.getEventos($scope.selectEvento);

    $scope.getAlimentos();
    $scope.filterPratos =function(alimento) {
    	return alimento.eventos.id.match(idEvento);
    };

  }])
  .filter('filterSelecionados', function($filter){
    return function(list, idEvento, element){
    	var ret = [];
    	
    	angular.forEach(list, function(val){
    		if($filter("filter")(val.eventos, {id: idEvento}).length > 0)
    			ret.push(val);
    	});
    	
    	return ret;
    };
  }).filter('filterNaoSelecionados', function($filter){
    return function(list, idEvento, element){
    	var ret = [];
    	
    	angular.forEach(list, function(val){
    		if($filter("filter")(val.eventos, {id: idEvento}).length == 0)
    			ret.push(val);
    	});
    	
    	return ret;
    };
});
