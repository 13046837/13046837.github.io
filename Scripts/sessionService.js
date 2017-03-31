BlogApp.service('sessionService',[ function(databaseService){

    this.setCurrentUser = function(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    this.logout = function(){
        localStorage.removeItem('currentUser');
    }

    this.currentUser = function(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}]);