BlogApp.filter('titleFilter',[ function(){
    return function(title){
        if(title.charAt(0) != title.charAt(0).toUpperCase()){
            return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
        }else{
            return title;
        }
    }
}]);