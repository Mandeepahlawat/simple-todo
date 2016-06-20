angular.module('todos.controllers', ['ionic', 'LocalStorageModule'])

.controller('main', function($scope, $ionicModal, $ionicTabsDelegate, $filter,localStorageService){
  //store the entities name in a variable
  var taskData = 'task';

  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });

  $scope.getAllTasks = function () {
    //fetches task from local storage
    if (localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData);
    } else {
      $scope.tasks = [];
    }
    // console.log($scope.tasks);
  }
  $scope.getCompletedTasks = function () {
    //fetches task from local storage
    if (localStorageService.get(taskData)) {
      tasks = localStorageService.get(taskData);
      $scope.completedTasks = $filter('filter')(tasks, { completed: 'true' });
    } else {
      $scope.completedTasks = [];
    }
  }
  $scope.getIncompletedTasks = function () {
    //fetches task from local storage
    if (localStorageService.get(taskData)) {
      tasks = localStorageService.get(taskData);
      $scope.incompleteTasks = $filter('filter')(tasks, { completed: '!true' });
    } else {
      $scope.incompleteTasks = [];
    }
    // console.log(tasks);
    // console.log($scope.incompleteTasks);
  }
  $scope.createTask = function () {
    //creates a new task
    $scope.tasks.push($scope.task);
    localStorageService.set(taskData, $scope.tasks);
    $scope.task = {};
    $scope.getCompletedTasks();
    $scope.getIncompletedTasks();
    //close new task modal
    $scope.newTaskModal.hide();
  }
  $scope.removeTask = function (index) {
    //removes a task
    $scope.tasks.splice(index, 1);
    localStorageService.set(taskData, $scope.tasks);
    $scope.getCompletedTasks();
    $scope.getIncompletedTasks();
  }
  $scope.toggleTaskState = function (index) {
    //updates a task as completed or incomplete
    if (index !== -1) {
      if($scope.tasks[index].completed)
        $scope.tasks[index].completed = true;
      else
        $scope.tasks[index].completed = false;
    }
    localStorageService.set(taskData, $scope.tasks); 
    $scope.getCompletedTasks();
    $scope.getIncompletedTasks();
  }

  $scope.openTaskModal = function () {
    $scope.newTaskModal.show();
  };

  $scope.closeTaskModal = function () {
    $scope.newTaskModal.hide();
  };
})
