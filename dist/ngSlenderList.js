angular.module('ngSlenderList.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../src/ngSlenderList/template/ngSlenderList.html",
    "<div class=task_grid><div class=gantt_grid_scale style=\"height: 34px; line-height: 33px\"><div class=task_grid_head_cell style=width:100px;float:left column_id=text>Task name</div><div class=\"task_grid_head_cell task_grid_head_add\" style=width:43px;float:right column_id=add data-toggle=modal data-target=#myModal></div></div><div class=task_grid_data><div id=tree1 class=taskTree></div></div></div><div class=\"modal fade\" id=myModal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button><h4 class=modal-title>Create a task</h4></div><div class=modal-body><input class=form-control placeholder=Name><input class=form-control placeholder=Name><input class=form-control placeholder=Name><input class=form-control placeholder=Name></div><div class=modal-footer><button type=button class=\"btn btn-default\" data-dismiss=modal>Close</button> <button type=button class=\"btn btn-primary\">Save changes</button></div></div></div></div>");
}]);
// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('ngSlenderList.config', [])
    .value('ngSlenderList.config', {
        debug: true
    });

// Modules
angular.module('ngSlenderList.directives', []);
angular.module('ngSlenderList.filters', []);
angular.module('ngSlenderList.services', []);
angular.module('ngSlenderList',
    [
        'ngSlenderList.config',
        'ngSlenderList.directives',
        'ngSlenderList.filters',
        'ngSlenderList.services',
        'ngSlenderList.templates'
    ]);
angular
  .module('ngSlenderList.directives', [])

  .directive('taskList', function() {
    return {    
      templateUrl: '../src/ngSlenderList/template/ngSlenderList.html'
    };
  });