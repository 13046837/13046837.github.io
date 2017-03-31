var BlogApp = angular.module('BlogApp', ['ngRoute', 'angularUUID2']);

BlogApp.config(function ($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: '/Views/main.html',
        controller: 'mainController'
    })

    .when('/post/:id', {
        templateUrl: '/Views/detail.html',
        controller: 'detailController'
    })

    .when('/account/', {
        templateUrl: '/Views/account.html',
        controller: 'accountController'
    })

    .when('/create/', {
        templateUrl: '/Views/create.html',
        controller: 'createController'
    })

    .when('/login/', {
        templateUrl: '/Views/login.html',
        controller: 'loginController'
    })

    .when('/register/', {
        templateUrl: '/Views/register.html',
        controller: 'registerController'
    })
    .otherwise({
        redirectTo: '/'
    })
});

BlogApp.controller('mainController', ['$scope', 'databaseService', 'archiveService', function($scope, databaseService, archiveService){
    databaseService.get();
    $scope.posts = databaseService.posts;
    $scope.dates = archiveService.fillArchive($scope.posts);
    $scope.listlength = 5;

    $scope.addToList = function(){
        $scope.listlength = $scope.listlength + 5;
    }

    $scope.filterDate = function(date){
        databaseService.get();
        $scope.posts = databaseService.posts;
        $scope.posts = archiveService.filterPosts($scope.posts, date.month, date.year);
    }

    $scope.showAll = function() {
        databaseService.get();
        $scope.posts = databaseService.posts;
    }
}]);

BlogApp.controller('loginController', ['$scope', '$location', 'loginService', 'sessionService', function($scope, $location, loginService, sessionService){
    var tried = false;
    
    $scope.login = function(){
        if(loginService.login($scope.username, $scope.password) != null){
            $location.path('/');
        }else{
            tried = true;
        }
    };

    $scope.checkTried = function() {
        return tried;
    };

    $scope.logout = function(){
        sessionService.logout();
    };

    $scope.checkAdmin = function(){
        if($scope.checkLoggedIn()){
            return (JSON.parse(localStorage.getItem('currentUser')).admin != false);
        }
        else{
            return false;
        }
    };

    $scope.checkLoggedIn = function(){
        return (JSON.parse(localStorage.getItem('currentUser')) != null);
    };
}]);

BlogApp.controller('accountController', ['$scope', 'sessionService', 'accountService', '$location', function($scope, sessionService, accountService, $location){
   $scope.user = JSON.parse(localStorage.getItem('currentUser'));
   $scope.username = $scope.user.username;
   $scope.mail = $scope.user.mail;
   $scope.image = $scope.user.image;
   var pass = false;

   $scope.setPass = function(){
        pass = true;
    };

   $scope.pass = function(){
       return pass;
   }

   $scope.saveChanges = function () {
    var newPassword = null;
    if(pass != false){
        newPassword = $scope.password;
    }
     accountService.editAccount($scope.user.id, $scope.username, $scope.mail, $scope.image, newPassword);
     $location.path('/');
   }

    $scope.deleteAccount = function() {
        accountService.deleteAccount($scope.user.id);
        sessionService.logout();
        $location.path('/');
    };
}]);

BlogApp.controller('detailController', ['$scope','$http', '$routeParams', '$location', 'postService', 'commentService', 'databaseService', 'uuid2', function($scope, $http, $routeParams, $location, postService, commentService, databaseService, uuid2){
    databaseService.get();
    var id = $routeParams.id;
    var editC = false;
    var editComment;
    var editP = false;
    var editPost;
    $scope.currentuser = JSON.parse(localStorage.getItem('currentUser'));
    $scope.post = postService.getPost(id);
    $scope.comments = commentService.getComments(id);
    $scope.postComment = function() {
        commentService.postComment({user: $scope.currentuser.username, post: $scope.post.id, date: new Date, comment: $scope.commentText, image: $scope.currentuser.image, id: uuid2.newuuid()});
        $scope.comments = commentService.getComments(id);
    };

    $scope.setEditC = function(comment){
        editC = true;
        editComment = comment;
        $scope.commentText = comment.comment;
    };

    $scope.editC = function(){
        return editC;
    };

     $scope.setEditP = function(post){
        editP = true;
        editPost = post;
        $scope.postText = post.body;
        $scope.postTitle = post.title;
    };

    $scope.editP = function(){
        return editP;
    };

    $scope.editComment = function() {
        commentService.editComment(editComment.id, $scope.commentText);
        editComment = null;
        editC = false;
        $scope.comments = commentService.getComments(id);
    };

    $scope.deleteComment = function(comment) {
        commentService.deleteComment(comment.id);
        $scope.comments = commentService.getComments(id);
    };

    $scope.editPost = function() {
        postService.editPost(editPost.id, $scope.postText, $scope.postTitle, $scope.postImage);
        editPost = null;
        editP = false;
        $scope.post = postService.getPost(id);
    };

    $scope.deletePost = function(post) {
        postService.deletePost(post.id);
        $location.path('/');
    }
}]);

BlogApp.controller('createController', ['$scope', 'postService', '$location', 'uuid2', function($scope, postService, $location, uuid2){
    $scope.createPost = function(){
        postService.createPost({title: $scope.title, body: $scope.body, date: new Date, image: $scope.image, id: uuid2.newuuid()});
        $location.path('/');
    }
}]);

BlogApp.controller('registerController', ['$scope', 'accountService', 'loginService', '$location', 'uuid2', function($scope, accountService, loginService, $location, uuid2){
    $scope.register = function(){
        if(accountService.isUsernameUnique($scope.username) && $scope.username.length <= 16 && $scope.username.length >= 5){
            accountService.register({username: $scope.username, mail: $scope.mail, password: $scope.password, admin: false, image: $scope.image, id: uuid2.newuuid()});
            loginService.login($scope.username, $scope.password)
            $location.path('/');
        }
    }

    $scope.checkUsername = function(){
        if(accountService.isUsernameUnique($scope.username)){
            $scope.usernameError = "This username is available."
        }else{
            $scope.usernameError = "This username is already in use."
        }
        if($scope.username.length <= 4){
            $scope.usernameError = "This username is too short."
        }else if($scope.username.length >= 17){
            $scope.usernameError = "This username is too long."
        }
    }
}]);