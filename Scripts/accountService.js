BlogApp.service('accountService',['databaseService', function(databaseService){
     this.register = function(data){
        databaseService.get();
        databaseService.users.push(data);

        localStorage.setItem('users', JSON.stringify(databaseService.users));
    };

    this.editAccount = function(id, username, mail, image, password) {
        databaseService.get();
        var accountIndex;
        databaseService.users.forEach(function(e, i) {
            if(e.id == id){
                console.log(i);
                console.log(e);
                accountIndex = i;
            }
        })
        if(accountIndex != null) {
            databaseService.users[accountIndex].username = username;
            databaseService.users[accountIndex].mail = mail;
            databaseService.users[accountIndex].image = image;
            if(password != null){
                databaseService.users[accountIndex].password = password;
            }
            localStorage.setItem('users', JSON.stringify(databaseService.users));
            localStorage.setItem('currentUser', JSON.stringify(databaseService.users[accountIndex]))
        }
    };

    this.deleteAccount = function(id){
        databaseService.get();
        var accountIndex;
        databaseService.users.forEach(function(e, i) {
            if(e.id == id){
                accountIndex = i;
            }
        })
        if(accountIndex != null) {
            databaseService.users.splice(accountIndex, 1);
            localStorage.setItem('users', JSON.stringify(databaseService.users));
        }
    };

    this.isUsernameUnique = function(username){
        databaseService.get();
        var unique = true;
        databaseService.users.forEach(function(e, i) {
            if(e.username == username){
                unique = false;
            }
        })
        return unique;
    }
}]);