angular
  .module('ngSlenderList.directives', [])

  .directive('taskList', function() {
    return {    
      templateUrl: '../src/ngSlenderList/template/ngSlenderList.html'
    };
  });