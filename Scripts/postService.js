BlogApp.service('postService',['databaseService', function(databaseService){
    
    this.getPost = function(id){
        databaseService.get();
        var post = null;
        databaseService.posts.forEach(function(e, i) {
            if(e.id == id){
               post = e;
            }
        })
        return post;
    };
     
    this.createPost = function(data){
        databaseService.get();
        databaseService.posts.push(data);
        localStorage.setItem('posts', JSON.stringify(databaseService.posts));
    };

    this.editPost = function(id, editText, editTitle, editImage) {
        databaseService.get();
        var postIndex;
        databaseService.posts.forEach(function(e, i) {
            if(e.id == id){
                postIndex = i;
            }
        })
        if(postIndex != null) {
            databaseService.posts[postIndex].body = editText;
            databaseService.posts[postIndex].title = editTitle;
            databaseService.posts[postIndex].image = editImage;
            localStorage.setItem('posts', JSON.stringify(databaseService.posts));
        }
    };

    this.deletePost = function(id){
        databaseService.get();
        var postIndex;
        databaseService.posts.forEach(function(e, i) {
            if(e.id == id){
                postIndex = i;
            }
        })
        if(postIndex != null){
            databaseService.posts.splice(postIndex, 1);
            localStorage.setItem('posts', JSON.stringify(databaseService.posts));
        }
    };
}]);