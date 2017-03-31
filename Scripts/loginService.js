BlogApp.service('loginService',['databaseService', 'sessionService', function(databaseService, sessionService){
    
    this.login = function(username, password){
        databaseService.get();
        var current;
        databaseService.users.forEach(function(e, i){
            if(e.username == username && e.password == password){
                current = e;
                sessionService.setCurrentUser(current);
            }
        })
        return current;
    }
}]);